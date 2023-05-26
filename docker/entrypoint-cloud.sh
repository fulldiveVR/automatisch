#!/bin/sh

set -e

if [ -n "$WORKER" ]; then
  yarn automatisch start-worker
elif [ -n "$WORKSHOP" ]; then
  yarn automatisch start-workshop
else
  yarn automatisch start
fi
