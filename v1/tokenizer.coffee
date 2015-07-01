tokenizer =

  stripTags: (str) -> str.replace /<.+?>/ig, '',

  tokenizeByRegexp: (str, regexp = /[^a-zа-яёъєїі’\-']/i) ->
    str
    .split regexp
    .filter (x) -> Boolean x.trim()
    .map (x) -> x.toLowerCase()

  tokenizeByStateMachine: (str) ->

    words = []
    buffer = ''

#    breakOnChars = ' ,-:;!?\r\n\t'.split('')

    breakOnChars = ' ,!?'.split('')
    ignoredCharsRx = /[^a-zа-яёъєїі ,!?]/gi
    bracketsRx = /[\[\(].*?[\]\)]/gi

    str = str
      .toLowerCase()
      .replace bracketsRx, ''
      .replace ignoredCharsRx, ''

    console.log '\n'

    for i in [0...str.length]
      char = str[i]
      isLast = i == str.length - 1

      if char in breakOnChars || isLast
        if buffer.length > 0
          words.push buffer
          if char.trim()
            words.push char
        else if isLast
          words.push buffer + char
        buffer = ''
      else
        if char != ' '
          buffer += char

    return words

module.exports = tokenizer