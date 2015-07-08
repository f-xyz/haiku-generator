require('chai').should();

const fs = require('fs');
const benchmark = require('micro-benchmark');
const tokenize = require('../src/tokenize');
const analyze = require('../src/analyze');

describe('analyzer', () => {

    it('compile() creates chain from list of words', () => {
        const tokens = 'a b c a c'.split(' ');
        const chain = analyze.compile(tokens);
        chain.should.eql([
            ['a', 'b', 'c'],
            ['b', 'c', 'a'],
            ['c', 'a', 'c']
        ]);
    });

    it('findNextWords() finds next words using 2 previous word', () => {
        const chain = [
            ['a', 'b', 'c'],
            ['a', 'b', 'd']
        ];
        const nextWord = analyze.findPossibleNextWords(chain, 'a', 'b');
        nextWord.should.eql(['c', 'd']);
    });

    it('findSecondWords() finds next word using 1 previous word', () => {
        const chain = [
            ['a', 'b', 'c'],
            ['a', 'b', 'd']
        ];
        const nextWord = analyze.findPossibleSecondWords(chain, 'a');
        nextWord.should.eql(['b']);
    });
});
