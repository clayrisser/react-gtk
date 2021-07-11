# File: /Makefile
# Project: react-gtk
# File Created: 10-07-2021 17:57:27
# Author: Clay Risser <email@clayrisser.com>
# -----
# Last Modified: 10-07-2021 21:01:19
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

export MAKE_CACHE := $(shell pwd)/node_modules/.make
export PARENT := true
include blackmagic.mk

BABEL ?= node_modules/.bin/babel
BABEL_NODE ?= node_modules/.bin/babel-node
CLOC ?= cloc
CSPELL ?= node_modules/.bin/cspell
ESLINT ?= node_modules/.bin/eslint
JEST ?= node_modules/.bin/jest
LOCKFILE_LINT ?= node_modules/.bin/lockfile-lint
MAJESTIC ?= node_modules/.bin/majestic
PRETTIER ?= node_modules/.bin/prettier
TMP_DIR ?= node_modules/.tmp
TSC ?= node_modules/.bin/tsc
WEBPACK ?= node_modules/.bin/webpack
COLLECT_COVERAGE_FROM := ["src/**/*.{js,jsx,ts,tsx}"]

.PHONY: all
all: build

ACTIONS += install
INSTALL_DEPS := $(patsubst %,$(DONE)/_install/%,package.json)
INSTALL_TARGET := $(INSTALL_DEPS) $(ACTION)/install
$(ACTION)/install:
	@$(NPM) install
	@$(call done,install)

ACTIONS += format~install
FORMAT_DEPS := $(call deps,format,$(shell $(GIT) ls-files 2>$(NULL) | \
	grep -E "\.((json)|(ya?ml)|(md)|([jt]sx?))$$"))
FORMAT_TARGET := $(FORMAT_DEPS) $(ACTION)/format
$(ACTION)/format:
#	@for i in $$($(call get_deps,format)); do echo $$i | \
#		grep -E "\.[jt]sx?$$"; done | xargs $(ESLINT) --fix >/dev/null ||true
	@$(PRETTIER) --write $(shell $(call get_deps,format))
	@$(call done,format)

ACTIONS += spellcheck~format
SPELLCHECK_DEPS := $(call deps,spellcheck,$(shell $(GIT) ls-files 2>$(NULL) | \
	$(GIT) ls-files | grep -E "\.(md)$$"))
SPELLCHECK_TARGET := $(SPELLCHECK_DEPS) $(ACTION)/spellcheck
$(ACTION)/spellcheck:
	@mkdir -p $(TMP_DIR)
	@node -e "console.log(JSON.stringify({language:'en',version:'0.1',words:require('./.vscode/settings.json')['cSpell.words']}, null, 2))" > \
		$(TMP_DIR)/cspellrc.json
	-@$(CSPELL) --config $(TMP_DIR)/cspellrc.json $(shell $(call get_deps,spellcheck))
	@$(call done,spellcheck)

ACTIONS += lint~spellcheck
LINT_DEPS := $(call deps,lint,$(shell $(GIT) ls-files 2>$(NULL) | \
	grep -E "\.([jt]sx?)$$"))
LINT_TARGET := $(LINT_DEPS) $(ACTION)/lint
$(ACTION)/lint:
#	-@$(LOCKFILE_LINT) --type npm --path package-lock.json --validate-https
	-@$(ESLINT) -f json -o node_modules/.tmp/eslintReport.json $(shell $(call get_deps,lint)) $(NOFAIL)
	-@$(ESLINT) $(shell $(call get_deps,lint))
	@$(call done,lint)

ACTIONS += test~lint
TEST_DEPS := $(call deps,test,$(shell $(GIT) ls-files 2>$(NULL) | \
	grep -E "\.([jt]sx?)$$"))
TEST_TARGET := $(TEST_DEPS) $(ACTION)/test
$(ACTION)/test:
	-@$(JEST) --json --outputFile=node_modules/.tmp/jestTestResults.json --coverage \
		--coverageDirectory=node_modules/.tmp/coverage --testResultsProcessor=jest-sonar-reporter \
		--collectCoverageFrom='$(COLLECT_COVERAGE_FROM)' --findRelatedTests $(shell $(call get_deps,test))
	@$(call done,test)

ACTIONS += build~test
BUILD_DEPS := $(call deps,build,$(shell $(GIT) ls-files 2>$(NULL) | \
	grep -E "\.([jt]sx?)$$"))
BUILD_TARGET := $(BUILD_DEPS) $(ACTION)/build
$(ACTION)/build: es/index.js lib/index.js ;
	@if [ ! -f $(MAKE_CACHE)/^build ]; then \
		$(MAKE) -s $(ACTION)/^build; \
	fi
	@$(call clear_cache,$(ACTION)/^build)
es/index.js:
	@$(MAKE) -s $(ACTION)/^build
lib/index.js:
	@$(MAKE) -s $(ACTION)/^build
$(ACTION)/^build:
	@$(BABEL) --env-name umd src -d lib --extensions '.js,.jsx,.ts,.tsx' --source-maps
	@$(BABEL) --env-name esm src -d es --extensions '.js,.jsx,.ts,.tsx' --source-maps
	@$(TSC) -p tsconfig.app.json -d --emitDeclarationOnly
	@$(call cache,$@)
	@$(call done,build)

.PHONY: prepare
prepare: ;

.PHONY: upgrade
upgrade:
	@$(NPM) upgrade --latest

.PHONY: inc
inc:
	@npm version patch --git=false $(NOFAIL)

.PHONY: count
count:
	@LC_ALL=C $(CLOC) $(shell $(GIT) ls-files)

.PHONY: publish +publish
publish: build
	@$(MAKE) -s +publish
+publish:
	@$(NPM) publish

.PHONY: pack +pack
pack: build
	@$(MAKE) -s +pack
+pack:
	@$(NPM) pack

.PHONY: coverage
coverage: ~lint
	@$(MAKE) -s +coverage
+coverage:
	@$(JEST) --coverage --collectCoverageFrom='$(COLLECT_COVERAGE_FROM)' $(ARGS)

.PHONY: test-ui
test-ui: ~lint
	@$(MAKE) -s +test-ui
+test-ui:
	@$(MAJESTIC) $(ARGS)

.PHONY: test-watch
test-watch: ~lint
	@$(MAKE) -s +test-watch
+test-watch:
	@$(JEST) --watch $(ARGS)

.PHONY: start +start
start: ~format
	@$(MAKE) -s +start
+start:
	@$(BABEL_NODE) --extensions '.ts,.tsx' src $(ARGS)

.PHONY: generate +generate
generate: ~format
	@$(MAKE) -s +generate
+generate:
	@$(BABEL_NODE) --extensions '.ts,.tsx' src/generate $(ARGS)

.PHONY: clean
clean:
	-@$(call clean)
	-@$(JEST) --clearCache $(NOFAIL)
	-@$(GIT) clean -fXd \
		-e $(BANG)/node_modules \
		-e $(BANG)/node_modules/**/* \
		-e $(BANG)/package-lock.json \
		-e $(BANG)/pnpm-lock.yaml \
		-e $(BANG)/yarn.lock $(NOFAIL)
	-@rm -rf node_modules/.cache $(NOFAIL)
	-@rm -rf node_modules/.tmp $(NOFAIL)

.PHONY: purge
purge: clean
	-@$(GIT) clean -fXd

-include $(patsubst %,$(_ACTIONS)/%,$(ACTIONS))

+%:
	@$(MAKE) -e -s $(shell echo $@ | $(SED) 's/^\+//g')

%: ;

CACHE_ENVS += \
	BABEL \
	BABEL_NODE \
	CLOC \
	CSPELL \
	ESLINT \
	JEST \
	LOCKFILE_LINT \
	MAJESTIC \
	PRETTIER \
	TMP_DIR \
	TSC \
	WEBPACK

examples/hello: examples/hello.c
	@$(CC) `pkg-config --cflags gtk4` -o $@ $^ `pkg-config --libs gtk4`
