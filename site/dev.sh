#!/bin/bash
# Dev-server launcher: puts portable Node on PATH (no system Node on this Mac),
# then runs Next.js dev. Used by .claude/launch.json and safe to run by hand.
export PATH="$HOME/.local/node/bin:$PATH"
cd "$(dirname "$0")"
exec npm run dev
