.POSIX:
ROOTDIR ?= $(eval ROOTDIR := $(shell git rev-parse --show-toplevel))$(ROOTDIR)
include $(ROOTDIR)/make.mk

.DEFAULT_GOAL := build

.PHONY: build
build:
	@$(PNPM) exec tsup

.PHONY: typecheck
typecheck:
	@$(TSC) --noEmit

.PHONY: test
test: test/unit

.PHONY: test/unit
test/unit:
	@$(VITEST) run --coverage --coverage.reporter=text --coverage.reporter=lcov

.PHONY: format
format:
	@$(OXFMT) .

.PHONY: lint
lint:
	@$(OXLINT)

.PHONY: clean
clean:
	@rm -rf lib coverage .tsbuildinfo
