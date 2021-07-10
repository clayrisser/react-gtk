# File: /blackmagic.mk
# Project: react-gtk
# File Created: 10-07-2021 17:57:27
# Author: Clay Risser <email@clayrisser.com>
# -----
# Last Modified: 10-07-2021 18:09:02
# Modified By: Clay Risser <email@clayrisser.com>
# -----
# Silicon Hills LLC (c) Copyright 2021
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----
# just a bit of black magic
#
# the magic of this makefile consists of functions and macros
# used to create complex cached dependency chains that track
# changes on individual files and works across unix environments
#
# for example, this can be used to format the code and run tests
# against only the files that updated
#
# this significantly increases the speed of builds and development in a
# language and ecosystem agnostic way without sacrificing enforcement of
# critical scripts and jobs
#
# an explanation of how this works is beyond the scope of this header
#
# - Clay Risser

CWD := $(shell pwd)
export NO_CHECK ?= false
export MAKE_CACHE ?= $(CWD)/.make
export _ACTIONS := $(MAKE_CACHE)/actions
export CHECK := $(MAKE_CACHE)/check
export DEPS := $(MAKE_CACHE)/deps
export DONE := $(MAKE_CACHE)/done
export ENVS := $(MAKE_CACHE)/envs
export ACTION := $(DONE)

.EXPORT_ALL_VARIABLES:

-include $(ENVS)

export PLATFORM := $(shell node -e "process.stdout.write(process.platform)")
export NIX_ENV := $(shell which sed | grep -qE "^/nix/store" && echo true|| echo false)
ifeq ($(PLATFORM),win32)
	BANG := !
	MAKE := make
	NULL := nul
	SHELL := cmd.exe
else
	BANG := \!
	NULL := /dev/null
	SHELL := $(shell bash --version >$(NULL) 2>&1 && echo bash|| echo sh)
endif
ifeq ($(NIX_ENV),true)
	export GREP ?= grep
	export SED ?= sed
else
ifeq ($(PLATFORM),darwin)
	export GREP ?= ggrep
	export SED ?= gsed
else
	export GREP ?= grep
	export SED ?= sed
endif
endif
ifeq ($(PLATFORM),linux)
	export NUMPROC ?= $(shell grep -c ^processor /proc/cpuinfo)
	export OPEN ?= xdg-open
else
	export OPEN ?= open
endif
ifeq ($(PLATFORM),darwin)
	export NUMPROC ?= $(shell sysctl hw.ncpu | awk '{print $$2}')
endif
export NUMPROC ?= 1
# MAKEFLAGS += "-j $(NUMPROC)"

export CD ?= cd
export GIT ?= $(shell git --version >$(NULL) 2>&1 && echo git|| echo true)
export NPM ?= $(shell pnpm --version >$(NULL) 2>&1 && echo pnpm|| (yarn --version >$(NULL) 2>&1 && echo yarn|| echo npm))
export NOFAIL := 2>$(NULL)|| true

PROJECT_ROOT ?= $(shell $(GIT) rev-parse --show-superproject-working-tree)
ifeq ($(PROJECT_ROOT),)
	PROJECT_ROOT := $(shell $(GIT) rev-parse --show-toplevel)
endif
ifeq ($(PROJECT_ROOT),)
	PROJECT_ROOT := $(CWD)
endif

CHILD := false
ifneq ($(PROJECT_ROOT),$(CWD))
ifeq ($(PARENT),true)
	CHILD := true
endif
endif

.EXPORT_ALL_VARIABLES:

_RUN := $(shell mkdir -p $(_ACTIONS) $(DEPS) $(DONE))

define done
	$(call reset_deps,$1)
	touch -m $(DONE)/$1
	rm -f $(DONE)/+$1 $(NOFAIL)
endef

define add_dep
	echo $2 >> $(DEPS)/$1
endef

define reset_deps
	rm -f $(DEPS)/$1 $(NOFAIL)
endef

define get_deps
	cat $(DEPS)/$1 $(NOFAIL)
endef

define cache
	mkdir -p $$(echo $1 | $(SED) 's/\/[^\/]*$$//g') && touch -m $1
endef

define clear_cache
	rm -rf $1 $(NOFAIL)
endef

define deps
	$(patsubst %,$(DONE)/_$1/%,$2)
endef

define clean
	rm -rf $(MAKE_CACHE) $(NOFAIL)
endef

define reset_envs
	rm -rf $(ENVS) $(NOFAIL)
endef

define ACTION_TEMPLATE
ifeq ($$(CHILD),true)
ifneq ($$(CHILD_{{ACTION_UPPER}}_READY),true)
CHILD_{{ACTION_UPPER}}_READY = true
.PHONY: child_{{ACTION}} child_+{{ACTION}} child__{{ACTION}} child_~{{ACTION}}
child_{{ACTION}}: child__{{ACTION}} child_~{{ACTION}}
child_~{{ACTION}}: | $$(CHECK) {{CHILD_ACTION_DEPENDENCY}} $$({{ACTION_UPPER}}_DEPS) \
	$$({{ACTION_UPPER}}_TARGET) $$(ACTION)/{{ACTION}}
child_+{{ACTION}}: | $$(CHECK) child__{{ACTION}} $$({{ACTION_UPPER}}_DEPS) \
	$$({{ACTION_UPPER}}_TARGET) $$(ACTION)/{{ACTION}}
child__{{ACTION}}:
	@touch -m $$(DONE)/+{{ACTION}}
	@$$(call clear_cache,$$(DONE)/_{{ACTION}})
	@$$(call clear_cache,$$(DONE)/{{ACTION}})
$$(DONE)/_{{ACTION}}/%: %
	@$$(call clear_cache,$$(DONE)/{{ACTION}})
	@$$(call add_dep,{{ACTION}},$$<)
	@$$(call cache,$$@)
endif
else
ifneq ($$({{ACTION_UPPER}}_READY),true)
{{ACTION_UPPER}}_READY = true
.PHONY: {{ACTION}} +{{ACTION}} _{{ACTION}} ~{{ACTION}}
{{ACTION}}: _{{ACTION}} ~{{ACTION}}
~{{ACTION}}: | $$(CHECK) {{ACTION_DEPENDENCY}} $$({{ACTION_UPPER}}_DEPS) \
	$$({{ACTION_UPPER}}_TARGET) $$(ACTION)/{{ACTION}}
+{{ACTION}}: | $$(CHECK) _{{ACTION}} $$({{ACTION_UPPER}}_DEPS) \
	$$({{ACTION_UPPER}}_TARGET) $$(ACTION)/{{ACTION}}
_{{ACTION}}:
	@touch -m $$(DONE)/+{{ACTION}}
	@$$(call clear_cache,$$(DONE)/_{{ACTION}})
	@$$(call clear_cache,$$(DONE)/{{ACTION}})
$$(DONE)/_{{ACTION}}/%: %
	@$$(call clear_cache,$$(DONE)/{{ACTION}})
	@$$(call add_dep,{{ACTION}},$$<)
	@$$(call cache,$$@)
endif
endif
endef

.PHONY: $(_ACTIONS)/%
$(_ACTIONS)/%:
	@ACTION_BLOCK=$(shell echo $@ | $(GREP) -oE '[^\/]+$$') && \
		ACTION=$$(echo $$ACTION_BLOCK | $(GREP) -oE '^[^~]+') && \
		ACTION_DEPENDENCY=$$(echo $$ACTION_BLOCK | $(GREP) -oE '~[^~]+$$' $(NOFAIL)) && \
		CHILD_ACTION_DEPENDENCY=$$([ "$$ACTION_DEPENDENCY" = "" ] && echo ""|| echo "child_$$ACTION_DEPENDENCY") && \
		ACTION_UPPER=$$(echo $$ACTION | tr '[:lower:]' '[:upper:]') && \
		echo "$${ACTION_TEMPLATE}" | $(SED) "s/{{ACTION}}/$${ACTION}/g" | \
		$(SED) "s/{{ACTION_DEPENDENCY}}/$${ACTION_DEPENDENCY}/g" | \
		$(SED) "s/{{CHILD_ACTION_DEPENDENCY}}/$${CHILD_ACTION_DEPENDENCY}/g" | \
		$(SED) "s/{{ACTION_UPPER}}/$${ACTION_UPPER}/g" > $@

$(CHECK): Makefile
ifneq ($(NO_CHECK),true)
	@echo "🔌 checking dependencies"
	@echo "💣 busted cache"
	@rm -rf $(MAKE_CACHE)
endif
	@mkdir -p $(_ACTIONS) $(DEPS) $(DONE)
	@touch -m $(CHECK)

$(ENVS): Makefile
	@echo "🗲  make will be faster next time"
	@rm -rf $@
	@for e in $$CACHE_ENVS; do \
		echo "export $$e := $$(eval "echo \$$$$e")" >> $@; \
	done

CACHE_ENVS += \
	GIT \
	GREP \
	NIX_ENV \
	NPM \
	NUMPROC \
	PLATFORM \
	PROJECT_ROOT \
	SED
