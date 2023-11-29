{ nixpkgs ? import <nixpkgs> {} }:

nixpkgs.stdenv.mkDerivation rec {
  name = "packages";
  LANG = "en_US.UTF-8";
  buildInputs = [
    nixpkgs.cloc
    nixpkgs.coreutils
    nixpkgs.expect
    nixpkgs.gnumake42
    nixpkgs.gnused
    nixpkgs.graphicsmagick
    nixpkgs.jq
    nixpkgs.postgresql
    nixpkgs.watchman
    nixpkgs.yq-go
  ];
}
