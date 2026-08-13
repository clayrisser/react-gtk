.POSIX:
ROOTDIR ?= $(eval ROOTDIR := $(shell git rev-parse --show-toplevel))$(ROOTDIR)
include $(ROOTDIR)/make.mk

.DEFAULT_GOAL := build

.PHONY: build
build:
	@$(PNPM) exec docusaurus build

.PHONY: dev
dev:
	@$(PNPM) exec docusaurus start

.PHONY: serve
serve: build
	@$(PNPM) exec docusaurus serve

.PHONY: format
format:
	@$(OXFMT) .

.PHONY: lint
lint:
	@$(OXLINT)

.PHONY: clean
clean:
	@rm -rf build .docusaurus
