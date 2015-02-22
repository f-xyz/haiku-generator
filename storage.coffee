_ = require('lodash')
fs = require('fs')
colors = require('colors')

storage = (db) ->
  items: []
  load: (db, nextFn) ->
    fs.readFile db, (e, file) ->
      if e then throw new Error e
      next JSON.parse file
  push: (item) ->
  save: (db, nextFn) ->

module.exports = storage