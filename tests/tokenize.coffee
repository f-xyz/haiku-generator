chai = require 'chai'
tokenize = require '../src/tokenize'

chai.should()

describe 'tokenizer tests', ->

    it 'returns [] on empty input', ->
        data = ''
        tokens = tokenize.words(data)
        tokens.should.eql([])

    it 'makes word list from a string', ->
        data = 'a  bc'
        tokens = tokenize.words(data)
        tokens.should.eql(['a', 'bc'])

#    it 'supports signs ' + tokenize.signs, ->
#        data = 'ab-,.'
#        tokens = tokenize.words(data)
#        tokens.should.eql(['ab', '-,.'.split('')...])

    it 'supports chars ' + tokenize.chars, ->
        data = 'зх’їєфійъхфьёыъ зх’їєфійъхфьёыъ'
        tokens = tokenize.words(data)
        tokens.should.eql(['зх’їєфійъхфьёыъ', 'зх’їєфійъхфьёыъ'])

    it 'everything is lower cased', ->
        data = 'A  Bc зх’їєфійъхфьёыъ зх’їєфійъхфьёыъ'
        tokens = tokenize.words(data)
        tokens.should.eql(['a', 'bc', 'зх’їєфійъхфьёыъ', 'зх’їєфійъхфьёыъ'])
