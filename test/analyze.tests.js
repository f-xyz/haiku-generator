require('chai').should();

const benchmark = require('micro-benchmark');
const analyze = require('../analyze');

describe('analyzer tests', () => {

    //it('markov2ndOrder creates 2nd order Markov chain as list', () => {
    //    const tokens = 'a b c'.split(' ');
    //    const chain = analyze.markov2ndOrder(tokens);
    //    chain.should.eql([
    //        ['a', 'b', 'c']
    //    ]);
    //});

    it('markov2ndOrder creates 2nd order Markov chain as list', () => {
        const tokens = 'a b c a c'.split(' ');
        const chain = analyze.markov2ndOrder(tokens);
        chain.should.eql([
            ['a', 'b', 'c'],
            ['b', 'c', 'a'],
            ['c', 'a', 'c']
        ]);
    });

    it('nextWords returns next word regarding to the chain', () => {
        const chain = [['a', 'b', 'c']];
        const nextWord = analyze.nextWords(chain, 'a', 'b');
        nextWord.should.eql(['c']);
    });

    it('nextWords2 returns next word regarding to the chain', () => {
        const chain = [['a', 'b', 'c']];
        const nextWord = analyze.nextWords2(chain, 'a', 'b');
        nextWord.should.eql(['c']);
    });

});

describe('builder tests', () => {

    it('should build a sentence', function () {
        const tokenize = require('../tokenize');
        const text = 'aaa bbb ccc aaa ccc';
        const words = tokenize.words(text);
        console.log('words', words);
        //
        const chain = analyze.markov2ndOrder(words);
        console.log('chain', chain);
        //
        let nextWord = analyze.nextWords(chain, 'aaa', 'bbb');
        console.log('next word', nextWord);
        nextWord = analyze.nextWords(chain, 'bbb', 'ccc');
        console.log('next word', nextWord);

        const res = analyze.build(chain, words);
        console.log(res);

    });

    xit('experimental stuff', () => {
        const tokenize = require('../tokenize');
        const fs = require('fs');
        const text = fs.readFileSync('data/haiku.txt').toString();
        const words = tokenize.words(text);

        console.log(benchmark.report(benchmark.suite({
            specs: [{
                name: 'asd',
                maxOperations: 1,
                fn: () => {
                    const chain = analyze.markov2ndOrder(words);

                    console.log(words);
                    console.log(chain);
                    console.log(new Array(65).join('-'));
                }
            }]
        }), { chartWidth: 20 }));
        console.log(new Array(65).join('-'));
    });

});
