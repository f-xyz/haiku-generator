require('chai').should();
const benchmark = require('micro-benchmark');
const analyze = require('../analyze');

///////////////////////////////////////////////////////////////////////////////

describe('analyzer tests', () => {

    it('markov2ndOrder creates 2nd order Markov chain as list', () => {
        const tokens = 'a b c'.split(' ');
        const chain = analyze.markov2ndOrder(tokens);
        chain.should.eql([
            [undefined, undefined, 'a'],
            [undefined, 'a', 'b'],
            ['a', 'b', 'c']
        ]);
    });

    it('markov2ndOrderObj creates 2nd order Markov chain as objects', () => {
        const tokens = 'a b c'.split(' ');
        const chain = analyze.markov2ndOrderObj(tokens);
        chain.should.eql({
            undefined: { undefined: { a: 1 }, a: { b: 1 }},
            a: { b: { c: 1 }}
        });
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

    xit('nextWords treats undefined as any word', () => {
        const chain = [[undefined, undefined, 'c']];
        const nextWord = analyze.nextWords2(chain, 'cat', 'fox');
        nextWord.should.eql(['c']);
    });

    it('nextWordsObj returns next word regarding to the chain', () => {
        const chain = { a: { b: { c: 1 }}};
        const nextWord = analyze.nextWordsObj(chain, 'a', 'b');
        nextWord.should.eql({ c: 1 });
    });

});

xdescribe('benchmarks', () => {
    const N = 1e4;
    let p, bigSequence = [];

    for (let i = 0; i < N; ++i) {
        bigSequence.push(`word${i}`);
    }

    //p = profile(() => analyze.markov2ndOrder(bigSequence));
    //it(report('markov2ndOrder', p), () => null);

    //p = profile(() => analyze.markov2ndOrderObj(bigSequence));
    //it(report('markov2ndOrderObj', p), () => null);
});

describe('builder tests', () => {

    const randomInt = (max) => Math.floor(Math.random() * max);
    const randomItem = (list) => list[randomInt(list.length)];

    it('experimental stuff', () => {
        const tokenize = require('../tokenize');
        const fs = require('fs');
        const text = fs.readFileSync('../data/haiku.txt').toString();
        //const text = 'Купатися чи не купатися.';
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

                    // pick random word
                    let result = [];
                    // prev. of prev. word, prev. word and word
                    let ppw, pw, w;
                    for (let i = 0; i < 12; ++i) {

                        if (!ppw) {
                            ppw = randomItem(words);
                        }

                        if (!pw) {
                            let matchByPPW = chain.filter(x => x[0] === ppw);
                            let randomWords = randomItem(matchByPPW);
                            pw = randomWords[1];
                        }

                        let nextWordsAvailable = analyze.nextWords(
                            chain,
                            ppw, pw);

                        w = nextWordsAvailable[0];
                        if (!w) {
                            ppw = null;
                            pw = null;
                            break;
                        }

                        //console.log('  --> ', word, '\n');
                        result.push(w);

                        ppw = pw;
                        pw = w;
                    }

                    // post-processing
                    result = result.join(' ') + '.';
                    result = result.replace(/\s{2,}/g, ' ');
                    result = result.replace(/\s([,.!])/g, '$1\n');
                    result = result.replace(/^\s+/g, '');
                    result = result.replace(/\n\s+/g, '\n');


                    console.log('\n' + result + '\n');
                    console.log(new Array(65).join('-'));
                }
            }]
        }), { chartWidth: 20 }));
        console.log(new Array(65).join('-'));
    });

});
