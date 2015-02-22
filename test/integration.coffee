_ = require('lodash')
fs = require('fs')
request = require('request')
should = require('chai').should()
colors = require('colors')
tokenize = require('../tokenizer')
storage = require('../storage')

bose = require('../engine')
draw = require('../draw')

console.log '\u001B[2J\u001B[0;0f'
console.log new Date()

describe 'haiku tests', ->

  content = '*^2$ SAF, ASF_5#%'

  xit 'RegExp tokenizer', ->
    tokenize.tokenizeByRegexp(content).should.eql ['saf', 'asf']

  xit 'StatMachine tokenizer', ->
    tokenize.tokenizeByStateMachine(content).should.eql ['*^2$', 'SAF', ',', 'ASF_5#%']

  it 'asd', ->
#      content = fs.readFileSync('data/fox.txt').toString()
#      content = fs.readFileSync('data/haiku.txt').toString()
#      content = fs.readFileSync(__dirname + '/../tokenizer.coffee').toString()
      content = fs.readFileSync('data/kobzar.txt').toString()
#      content = fs.readFileSync('data/mars.txt').toString()
#      content = fs.readFileSync('data/referat.txt').toString()
#      content = 'Чим учить вірші, Тичини, краще з’їсти кирпичини.'


#      content = bose.stripTags content
      words = tokenize.tokenizeByRegexp content
#      words = tokenize.tokenizeByStateMachine content
      data = bose.analyze words

#      console.log data

      for i in [0...1]
        builder = bose.builder(data)
        console.log '\n' + builder.build()
        console.log '\n'

        builder.wordsToRhymeWith.forEach (word, i) ->

          words = bose.findRhymingWords words, word
          rhyme = builder.rhymesFound[i].slice 5, -5

          console.log word.green
          console.log '  ', rhyme.yellow, bose.similarity(word, rhyme).toFixed(2)
          words.slice(0, 3).forEach (x) ->
            console.log '  ', x, bose.similarity(x, word).toFixed(2)

        console.log '\n'

