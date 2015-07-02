#!/usr/bin/env bash

reporter=$1
: ${reporter:='spec'}

testFile=$2
: ${testFile:='./tests/index.js'}

mocha --watch -R ${reporter} ${testFile}
