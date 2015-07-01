fs = require('fs')
colors = require('colors')
f_context = require('f_context')
request = require('request')
_ = require('lodash')

E = Math.E
log = Math.log
abs = Math.abs

config =
  wordsTotal : 16
#  wordsTotal : 10
  lineTotal : 4
  rhyme : [2, -1]
#  rhyme : [0, 0]

reverse = (x) -> x.split('').reverse().join('')
upperFirst = (s) -> s[0].toUpperCase() + s.slice(1)
randomInt = (max) -> max * Math.random() | 0
bones = (x = 0.5) -> Math.random() >= x

green = (str) -> str && str.green
yellow = (str) -> str && str.yellow
red = (str) -> str && str.red
blue = (str) -> str && str.blue
bold = (str) -> str && str.bold
clearColor = (str) ->
  if str[1] == '['
    str = str.slice 5, -5
  return str

#######################################

#######################################

analyze = (words) ->
  res = {}
  prev = null
  words.forEach (curr) ->
    if !res[curr] then res[curr] = {}
    if prev
      if  !res[prev][curr] then res[prev][curr] = 1
      else res[prev][curr]++
    prev = curr
  res = sortSet res
  return res

sortSet = (set) ->
  _.mapValues set, (freqData) ->
    if _.size(freqData) > 1
      freqData = _.pairs freqData
      freqData = _.sortBy freqData, (x) -> -x[1]
      freqData = _.zipObject freqData, null
    else
      freqData

#######################################

similarity = (x, y) ->
  x = reverse x
  y = reverse y
  n = Math.min x.length, y.length
  diff = 0
  for i in [0...n]
      if x[i] == y[i] then diff++
      else break
  return diff / log(E + abs(x.length - y.length))

#######################################

builder = (data) ->
  history = []
  lines = []
  line = []
  word = null
  allWords = _.keys data
  wordsToRhymeWith = []
  rhymesFound = []

  isEnoughForLine = (wordInLine, wordsTotal) ->
    switch
      when wordInLine >= config.lineTotal then true
      when wordsTotal >= config.wordsTotal then true
      else false

  isEnough = (totalWords) ->
    totalWords >= config.wordsTotal

  compileLine = () ->
    loop

      isLastWordInLine = isEnoughForLine line.length + 1, history.length

      if !word # first word ever

        word = pickRandomFrom allWords
        line.push word

      else

        word = clearColor word

        suitableWords = _.keys data[word]

        if lines.length > 0 && \
           isLastWordInLine && \
           (lines.length + 1) % config.rhyme[0] == 0

          prevLine = lines[lines.length + config.rhyme[1]]
          rhymeWord = prevLine[prevLine.length - 1]
          wordsToRhymeWith.push rhymeWord

          word = green(pickRhymedFrom suitableWords, rhymeWord, 3) \
              || yellow(pickRhymedFrom allWords, rhymeWord) \
              || red(pickFirstFrom suitableWords) \
              || red(pickRandomFrom allWords)

          rhymesFound.push word

        else

            # todo take longest words for the ends of the lines
            word = (pickRandomFrom suitableWords) \
            || blue(pickRandomFrom allWords)

        line.push word

      history.push word
      break if isLastWordInLine

  compile = () ->
    loop
      line = []
      compileLine()
      lines.push line
      break if isEnough(history.length)

  build = () ->
    history = []
    lines = []

    compile()

    lines
    lines = lines.map (x) -> x.join ' '
    postProcess lines.join('\n') + '.'

  return { build, wordsToRhymeWith, rhymesFound }

#######################################

pickFirstFrom = (words) -> words[0]
pickRandomFrom = (words) -> words[randomInt words.length]
pickRhymedFrom = (words, rhymeWord, threshold = 0) ->
  pickFirstFrom(findRhymingWords(words, rhymeWord, threshold))

findRhymingWords = (words, rhymeWord, threshold = 0) ->
  _(words)
    .filter (x) -> similarity(x, rhymeWord) >= threshold
    .sortBy (x) -> -similarity(x, rhymeWord)
    .difference [rhymeWord]
    .unique()
    .value()

#######################################

postProcess = (s) ->
  s
    .replace /([ ,.\-:;!?*])+/gm, '$1'
    .replace /^\s+/gm, ''
    .replace /^./gm, (x) -> x.toUpperCase()

#######################################

module.exports = {
  analyze,
  postProcess,
  similarity,
  pickRandomFrom,
  pickFirstFrom,
  pickRhymedFrom,
  findRhymingWords,
  builder
}
