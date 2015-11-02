fs = require('fs')
benchmark = require('micro-benchmark')
tokenize = require('../src/tokenize')
analyze = require('../src/analyze')

describe 'analyzer', ->

    it 'compile() creates chain from list of words', ->
        words = 'a b c a c'.split ' '
        chain = analyze.compile words
        chain.should.eql [
            ['a', 'b', 'c']
            ['b', 'c', 'a']
            ['c', 'a', 'c']
        ]

    it 'findFirstWords() picks first word from every chain item', ->
        chain = [
            ['a', 'b', 'c']
            ['a', 'b', 'd']
        ]
        nextWord = analyze.findPossibleSecondWords chain, 'a'
        nextWord.should.eql ['b']

    it 'findSecondWords() finds words using 1 previous word', ->
        chain = [
            ['a', 'b', 'c']
            ['a', 'b', 'd']
        ]
        nextWord = analyze.findPossibleSecondWords chain, 'a'
        nextWord.should.eql ['b']

    it 'findNextWords() finds next words using 2 previous words', ->
      chain = [
        ['a', 'b', 'c']
        ['a', 'b', 'd']
      ]
      nextWord = analyze.findPossibleNextWords chain, 'a', 'b'
      nextWord.should.eql ['c', 'd']
