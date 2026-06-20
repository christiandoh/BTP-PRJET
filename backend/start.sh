#!/bin/sh
set -e
npx prisma db push --accept-data-loss 2>/dev/null || npx prisma db push
exec node src/index.js
