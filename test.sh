#!/usr/bin/env bash

spec=$1
: ${spec:='spec'}

mocha --watch --compilers js:babel/register -R ${spec}
