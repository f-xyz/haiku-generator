#!/usr/bin/env bash

reporter=$1
: ${reporter:='spec'}

testFile=$2
: ${testFile:='./test/index.js'}

mocha --watch -R ${reporter} ${testFile}
