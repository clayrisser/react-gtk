.ONESHELL:
.POSIX:
.SILENT:

MKPM := ./mkpm
.PHONY: %
%:
	@$(MKPM) "$@" $(ARGS)
