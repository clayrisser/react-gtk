.POSIX:
ROOTDIR ?= $(eval ROOTDIR := $(shell git rev-parse --show-toplevel))$(ROOTDIR)
include $(ROOTDIR)/make.mk

.DEFAULT_GOAL := dev

# Running an example needs the node-gtk native binding and a working GTK4
# installation (Linux or macOS with `brew install gtk4`).
.PHONY: dev
dev:
	@$(MAKE) -C $(ROOTDIR)/packages/core build
	@$(TSX) src/index.tsx

.PHONY: typecheck
typecheck:
	@$(TSC) --noEmit

.PHONY: format
format:
	@$(OXFMT) .

.PHONY: lint
lint:
	@$(OXLINT)

.PHONY: clean
clean:
	@rm -rf .tsbuildinfo
