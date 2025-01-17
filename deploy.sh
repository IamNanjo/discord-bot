#!/usr/bin/env bash

alias bun="$HOME/.local/bin/mise x bun -- bun"

bun upgrade
bun install
bun update

bun run start
