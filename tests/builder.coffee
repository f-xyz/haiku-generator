fs = require('fs')
benchmark = require('micro-benchmark')
tokenize = require('../src/tokenize')
analyze = require('../src/analyze')
builder = require('../src/builder')

describe 'build() & integration tests', ->

    it 'builds a sentence', ->

        text = 'aaa bbb ccc aaa bbb ddd'
        text = fs.readFileSync('data/fox.txt').toString()
        words = tokenize.words(text)
#        console.log('words', words)

        chain = analyze.compile(words)
#        console.log('chain', chain)

        nextWord = analyze.findPossibleNextWords(chain, 'aaa', 'bbb')
#        console.log('next word: ', nextWord)

        res = builder.build(chain, words)
        console.log('\n')
        console.log(res)
        console.log('\n')
