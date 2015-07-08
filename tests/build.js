require('chai').should();

const fs = require('fs');
const benchmark = require('micro-benchmark');
const tokenize = require('../src/tokenize');
const analyze = require('../src/analyze');
const build = require('../src/build');

describe('builder', () => {

    it('builds a sentence', () => {
        //const text = 'aaa bbb ccc aaa bbb ddd';
        const text = fs.readFileSync('data/haiku.txt').toString();
        const words = tokenize.words(text);
        //console.log('words', words);

        const chain = analyze.compile(words);
        //console.log('chain', chain);

        let nextWord = analyze.findPossibleNextWords(chain, 'aaa', 'bbb');
        //console.log('next word: ', nextWord);

        const res = build(chain, words);
        console.log(res);
    });

});
