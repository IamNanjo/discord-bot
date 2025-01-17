#!/usr/bin/env bash

PATH="$HOME/.local/bin"

bun upgrade
bun install
bun update

bun run start
