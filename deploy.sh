#!/usr/bin/env bash

builtin source ~/.bashrc

mise x bun -- bun upgrade
mise x bun -- bun install
mise x bun -- bun update

mise x bun -- bun run start
