#!/usr/bin/env bash

builtin source ~/.env

~/.local/bin/mise x bun -- pm2 flush &&
~/.local/bin/mise x bun -- bun install &&
~/.local/bin/mise x bun -- bun run start
