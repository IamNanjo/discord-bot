#!/usr/bin/env bash

alias bun="~/.local/bin/mise x bun -- bun"

bun upgrade
bun install
bun update

bun run start
