utils = require('../src/utils')

describe 'Utils', ->

  it 'randomInt() return random integer', ->
    utils.randomInt(10).should.instanceOf(Number)

  describe 'syllablesCount()', ->
    it 'returns count of syllables', ->
      # .toString() is for core-js (library used in babel.io) issue
      utils.syllablesCount('').toString().should.eq('0')
      utils.syllablesCount('zxc').toString().should.eq('0')
      utils.syllablesCount('script').toString().should.eq('1')
      utils.syllablesCount('data').toString().should.eq('2')
