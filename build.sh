#!/usr/bin/env bash
# exit on error
set -o errexit

yarn build
npx prisma migrate deploy