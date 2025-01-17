#!/usr/bin/env bash

~/.local/bin/mise x bun -- bun upgrade
~/.local/bin/mise x bun -- bun install
~/.local/bin/mise x bun -- bun update

~/.local/bin/mise x bun -- bun run start
