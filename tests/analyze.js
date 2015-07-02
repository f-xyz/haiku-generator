require('chai').should();

const benchmark = require('micro-benchmark');
const analyze = require('../src/analyze');

describe('builder', () => {

    xit('should build a sentence', function () {
        const tokenize = require('../src/tokenize');
        const text = 'aaa bbb ccc aaa ccc';
        const words = tokenize.words(text);
        console.log('words', words);
        //
        const chain = analyze.compile(words);
        console.log('chain', chain);
        //
        let nextWord = analyze.findNextWord(chain, 'aaa', 'bbb');
        console.log('next word', nextWord);
        nextWord = analyze.findNextWord(chain, 'bbb', 'ccc');
        console.log('next word', nextWord);

        const res = analyze.build(chain, words);
        console.log(res);

    });

    xit('experimental stuff', () => {
        const tokenize = require('../src/tokenize');
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
