# File: /Makefile
# Project: react-ast
# File Created: 28-11-2023 02:58:22
# Author: Clay Risser
# -----
# BitSpur (c) Copyright 2019 - 2023
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

include $(MKPM)/mkpm
include $(MKPM)/gnu
include $(MKPM)/chain
include $(MKPM)/yarn
include $(MKPM)/envcache
include $(MKPM)/dotenv
include $(PROJECT_ROOT)/shared.mk

TS_NODE ?= $(call yarn_binary,ts-node)
REACT_GTK_GENERATE ?= $(call yarn_binary,react-gtk-generate)

ACTIONS += deps
$(ACTION)/deps: package.json
	@$(YARN) install $(DEPS_ARGS)
	@$(call done,$@)

ACTIONS += format~deps ##
$(ACTION)/format: $(call git_deps,\.((json)|(md)|([jt]sx?))$$)
	-@$(call prettier,$?,$(FORMAT_ARGS))
	@$(call done,$@)

ACTIONS += spellcheck~format ##
$(ACTION)/spellcheck: $(call git_deps,\.(md)$$)
	-@$(call cspell,$?,$(SPELLCHECK_ARGS))
	@$(call done,$@)

ACTIONS += generate~spellcheck ##
$(ACTION)/generate: $(call git_deps,\.([jt]sx?)$$)
	@$(REACT_GTK_GENERATE) --out src/generated
	@$(call done,$@)

ACTIONS += lint~generate ##
$(ACTION)/lint: $(call git_deps,\.([jt]sx?)$$)
	-@$(call eslint,$?,$(LINT_ARGS))
	@$(call done,$@)

ACTIONS += test~lint ##
$(ACTION)/test: $(call git_deps,\.([jt]sx?)$$)
	-@$(RM) -rf lib $(NOOUT)
	-@$(call test,$?,$(TEST_ARGS))
	@$(call done,$@)

ACTIONS += build~test ##
BUILD_TARGET := lib/index.js
lib/index.js:
	@$(call reset,build)
$(ACTION)/build: $(call git_deps,\.([jt]sx?)$$)
	@NODE_OPTIONS='--max-old-space-size=16384' $(TSUP)
	@$(call done,$@)

.PHONY: dev
dev: ~deps +dev
+dev:
	@$(TS_NODE) src/example.tsx

.PHONY: count
count:
	@$(CLOC) $(shell ($(GIT) ls-files && ($(GIT) lfs ls-files | $(CUT) -d' ' -f3)) | $(SORT) | $(UNIQ) -u)

.PHONY: jest
jest:
	@$(JEST) $(JEST_ARGS)

-include $(call chain)
