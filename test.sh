#!/usr/bin/env bash

reporter=$1
: ${reporter:='spec'}

testFile=$2
: ${testFile:='./test'}

mocha --watch -R ${reporter} ${testFile}
