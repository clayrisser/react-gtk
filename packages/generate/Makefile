PLATFORM := $(shell node -e "process.stdout.write(process.platform)")
ifeq ($(PLATFORM), win32)
  SHELL = cmd
endif

NPM := npm
ifeq ($(shell pnpm --version >/dev/null 2>&1 && echo true || echo false), true)
	NPM = pnpm
else
ifeq ($(shell yarn --version >/dev/null 2>&1 && echo true || echo false), true)
	NPM = yarn
endif
endif

GIT := true
ifeq ($(shell git --version >/dev/null 2>&1 && echo true || echo false), true)
	GIT = git
endif

.EXPORT_ALL_VARIABLES:

.PHONY: all
all: build

.PHONY: install
install: node_modules
node_modules: package.json
	# @$(NPM) install

.PHONY: prepare
prepare:
	@sh prepare.sh

.PHONY: format
format: install
	-@eslint --fix --ext .ts,.tsx . >/dev/null || true
	@prettier --write ./**/*.{json,md,scss,yaml,yml,js,jsx,ts,tsx} --ignore-path .gitignore
	@mkdir -p node_modules/.make && touch -m node_modules/.make/format
node_modules/.make/format: $(shell $(GIT) ls-files | grep -E "\.(j|t)sx?$$")
	@$(MAKE) -s format

.PHONY: spellcheck
spellcheck: node_modules/.make/format
	-@cspell --config .cspellrc src/**/*.ts
	@mkdir -p node_modules/.make && touch -m node_modules/.make/spellcheck
node_modules/.make/spellcheck: $(shell $(GIT) ls-files | grep -E "\.(j|t)sx?$$")
	-@$(MAKE) -s spellcheck

.PHONY: lint
lint: node_modules/.make/spellcheck
	-@tsc --allowJs --noEmit
	-@eslint --ext .ts,.tsx .
	@eslint -f json -o node_modules/.tmp/eslintReport.json --ext .ts,.tsx ./
node_modules/.tmp/eslintReport.json: $(shell $(GIT) ls-files | grep -E "\.(j|t)sx?$$")
	-@$(MAKE) -s lint

.PHONY: test
test: node_modules/.tmp/eslintReport.json
	@jest --json --outputFile=node_modules/.tmp/jestTestResults.json --coverage --coverageDirectory=node_modules/.tmp/coverage --testResultsProcessor=jest-sonar-reporter --collectCoverageFrom='["src/**/*.{js,jsx,ts,tsx}","!src/**/*.story.{js,jsx,ts,tsx}"]' $(ARGS)
node_modules/.tmp/coverage/lcov.info: $(shell $(GIT) ls-files | grep -E "\.(j|t)sx?$$")
	-@$(MAKE) -s test

.PHONY: coverage
coverage: node_modules/.tmp/eslintReport.json
	@jest --coverage --coverageDirectory=node_modules/.tmp/coverage --collectCoverageFrom='["src/**/*.{js,jsx,ts,tsx}","!src/**/*.story.{js,jsx,ts,tsx}"]' $(ARGS)

.PHONY: test-watch
test-watch: node_modules/.tmp/eslintReport.json
	@jest --watch --collectCoverageFrom='["src/**/*.{js,jsx,ts,tsx}","!src/**/*.story.{js,jsx,ts,tsx}"]' $(ARGS)

.PHONY: test-ui
test-ui: src/generated/apollo.tsx node_modules
	@majestic $(ARGS)

.PHONY: clean
clean:
	-@jest --clearCache
	@git clean -fXd \
		-e \!/packages/generate/node_modules \
		-e \!/packages/generate/node_modules/**/* \
		-e \!/packages/generate/package-lock.json \
		-e \!/packages/generate/pnpm-lock.yaml \
		-e \!/packages/generate/yarn.lock
	-@rm -rf node_modules/.cache || true
	-@rm -rf node_modules/.make || true
	-@rm -rf node_modules/.tmp || true

.PHONY: build
build: lib
lib: node_modules/.tmp/coverage/lcov.info $(shell $(GIT) ls-files)
	-@rm -rf lib node_modules/.tmp/lib 2>/dev/null || true
	@babel src -d lib --extensions '.ts,.tsx' --source-maps inline
	@tsc -d --emitDeclarationOnly
	@rm -rf lib/tests
	@mkdir -p node_modules/.tmp/lib
	@mv lib/src node_modules/.tmp/lib/src
	@cp -r node_modules/.tmp/lib/src/* lib 2>/dev/null || true
	@cp -r node_modules/.tmp/lib/src/.* lib 2>/dev/null || true

.PHONY: start
start: node_modules
	@babel-node --extensions '.ts,.tsx' src/actions/generate $(ARGS)

.PHONY: purge
purge: clean
	@git clean -fXd

.PHONY: report
report: spellcheck lint test
	@

%:
	@
