#!/bin/sh

BRANCH="$(git branch --show-current)"

echo "Main Branch: $BRANCH"

if [ "$BRANCH" != "develop" ] || [ "$BRANCH" != "master" ]; then

  INTERNALS="digit-ui-internals"

  cd $INTERNALS && echo "Branch: $(git branch --show-current)" && echo "$(git log -1 --pretty=%B)" && yarn && yarn build && find . -name "node_modules" -type d -prune -print -exec rm -rf '{}' \;
  cd ..

  rm -rf node_modules
  rm yarn.lock

fi

# yarn install
