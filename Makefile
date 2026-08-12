.POSIX:
export ROOTDIR ?= $(eval ROOTDIR := $(shell git rev-parse --show-toplevel))$(ROOTDIR)
include $(ROOTDIR)/make.mk

.DEFAULT_GOAL := build

ASDF_VERSION ?= v0.18.0
.PHONY: prepare prepare/asdf prepare/cloc
prepare: sudo
	@command -v asdf >/dev/null 2>&1 || $(MAKE) prepare/asdf
	@command -v cloc >/dev/null 2>&1 || $(MAKE) prepare/cloc
	@awk '!/^#/ && NF {print $$1}' .tool-versions | \
		while read t; do asdf plugin add "$$t" 2>/dev/null || true; done
	@rcfile=$$(mktemp); \
		{ asdf install 2>&1; echo $$? >$$rcfile; } | grep --line-buffered -v 'is already installed' || true; \
		rc=$$(cat $$rcfile); rm -f $$rcfile; exit $$rc
	@$(PNPM) install
prepare/asdf:
	@command -v brew >/dev/null 2>&1 && brew install asdf || { \
		o=$$(uname | tr A-Z a-z); a=$$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/'); \
		curl -fsSL "https://github.com/asdf-vm/asdf/releases/download/$(ASDF_VERSION)/asdf-$(ASDF_VERSION)-$$o-$$a.tar.gz" \
			| $(SUDO) tar -xz -C /usr/local/bin asdf; \
	}
prepare/cloc:
	@$(PKG_INSTALL) cloc

.PHONY: configure
configure:
	@for cmd in asdf node $(PNPM) $(CLOC); do \
		command -v $$cmd >/dev/null 2>&1 || { echo "$$cmd is missing, run \`make prepare\`"; exit 1; }; \
	done

.PHONY: deps ~deps
~deps: node_modules/.modules.yaml
node_modules/.modules.yaml: pnpm-lock.yaml $(shell $(GIT) ls-files | grep -E '(^|/)package\.json$$')
	@$(MAKE) deps
deps: FORCE
	@$(PNPM) install

.PHONY: build
build: packages/generate/build packages/core/build

.PHONY: generate
generate: packages/core/generate

.PHONY: typecheck
typecheck: packages/generate/typecheck packages/core/typecheck build \
	examples/example/typecheck examples/test/typecheck examples/todo/typecheck

.PHONY: test
test: test/unit

.PHONY: test/unit
test/unit: packages/generate/test/unit packages/core/test/unit

.PHONY: format
format: configure ~deps
	@$(OXFMT) .

.PHONY: lint
lint: configure ~deps
	@$(OXLINT)

.PHONY: spellcheck
spellcheck: configure ~deps
	@$(CSPELL) lint --no-progress .

.PHONY: version
version: configure ~deps
	@$(CHANGESET)
	@$(CHANGESET) version

.PHONY: publish
publish: configure ~deps build
	@$(CHANGESET) publish

.PHONY: count
count: configure
	@$(CLOC) $(shell $(GIT) ls-files)

.PHONY: clean
clean:
	@$(MAKE) -C packages/generate clean
	@$(MAKE) -C packages/core clean
	@$(MAKE) -C docs clean
	@rm -rf $(MAKEDIR)

.PHONY: purge
purge: clean
	@$(GIT) clean -fxd

.PHONY: packages/core packages/generate examples/example examples/test examples/todo docs \
	packages/core/% packages/generate/% examples/example/% examples/test/% examples/todo/% docs/%
packages/core packages/generate examples/example examples/test examples/todo docs: configure ~deps FORCE
	@$(MAKE) -C $@
packages/core/%: configure ~deps FORCE
	@$(MAKE) -C packages/core $*
packages/generate/%: configure ~deps FORCE
	@$(MAKE) -C packages/generate $*
examples/example/%: configure ~deps FORCE
	@$(MAKE) -C examples/example $*
examples/test/%: configure ~deps FORCE
	@$(MAKE) -C examples/test $*
examples/todo/%: configure ~deps FORCE
	@$(MAKE) -C examples/todo $*
docs/%: configure ~deps FORCE
	@$(MAKE) -C docs $*
