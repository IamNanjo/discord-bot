#!/usr/bin/env bash

builtin source ~/.env

~/.local/bin/mise x bun -- bun install
~/.local/bin/mise x bun -- bun run start
