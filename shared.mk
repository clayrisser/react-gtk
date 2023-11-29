# File: /shared.mk
# Project: root
# File Created: 28-11-2023 22:41:29
# Author: Clay Risser
# -----
# BitSpur (c) Copyright 2017 - 2023
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

CHANGESET ?= $(call yarn_binary,changeset)
CLOC ?= cloc
CSPELL ?= $(call yarn_binary,cspell)
ESLINT ?= $(call yarn_binary,eslint)
JEST ?= $(call yarn_binary,jest)
PRETTIER ?= $(call yarn_binary,prettier)
TSUP ?= $(call yarn_binary,tsup)

export CACHE_ENVS += \
	CHANGESET \
	CSPELL \
	ESLINT \
	JEST \
	PRETTIER \
	TSUP
