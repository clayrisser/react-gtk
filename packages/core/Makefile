.POSIX:
ROOTDIR ?= $(eval ROOTDIR := $(shell git rev-parse --show-toplevel))$(ROOTDIR)
include $(ROOTDIR)/make.mk

.DEFAULT_GOAL := build

# Widget elements and props interfaces are generated from the system's
# Gtk-4.0.gir by @react-gtk/generate. The output is gitignored, so a fresh
# clone builds it once via the ~generate marker; `make generate` forces a
# full regeneration.
.PHONY: generate ~generate
~generate: src/generated/index.ts
src/generated/index.ts:
	@$(MAKE) generate
generate: FORCE
	@$(MAKE) -C $(ROOTDIR)/packages/generate build
	@$(PNPM) exec react-gtk-generate --out src/generated

.PHONY: build
build: ~generate
	@NODE_OPTIONS='--max-old-space-size=16384' $(PNPM) exec tsup

.PHONY: typecheck
typecheck: ~generate
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
	@rm -rf lib coverage .tsbuildinfo src/generated
