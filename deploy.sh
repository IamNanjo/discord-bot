#!/usr/bin/env bash

source ~/.bashrc

bun upgrade
bun install
bun update

bun run start
