require('chai').should();
const analyze = require('../analyze');

//const lol = require('lol');
//const q = new Array(10).join('q').split('').map(lol).join(' ');
//console.log(q);

const profile = (fn, duration = 100) => {

    const maxOperations = 1e3;
    let started = Date.now();
    let operations = 0, elapsed;

    while (true) {

        fn();
        operations++;
        elapsed = Date.now() - started;

        if (elapsed > duration || operations > maxOperations) {
            break;
        }
    }
    return {
        fps: operations / elapsed * 1000,
        time: elapsed / operations
    };
};

const report = (name, p) =>
    `${name} -> ` +
    `${p.time.toFixed(2)} ms, ` +
    `${p.fps.toFixed(2)} ops`;

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

describe('benchmarks', () => {
    const N = 1e4;
    let p, bigSequence = [];

    for (let i = 0; i < N; ++i) {
        bigSequence.push(`word${i}`);
    }

    p = profile(() => analyze.markov2ndOrder(bigSequence));
    it(report('markov2ndOrder', p), () => null);

    p = profile(() => analyze.markov2ndOrderObj(bigSequence));
    it(report('markov2ndOrderObj', p), () => null);
});

xdescribe('builder tests', () => {

    const randomInt = (max) => Math.floor(Math.random() * max);
    const pickRandom = (list) => list[randomInt(list.length)];

    it('experimental stuff', () => {
        const tokenize = require('../tokenize');
        const fs = require('fs');
        const text = fs.readFileSync('../data/haiku.txt').toString();
        const words = tokenize.words(text);

        const chain = analyze.markov2ndOrder(words);

        let result = [];

        // pick random word
        let word, prev2Word, prev1Word;
        for (let i = 0; i < 30; ++i) {

            //console.log('#', result.join(' '));
            //console.log('  @', i, prev2Word, prev1Word);

            if (!prev2Word) {
                prev2Word = pickRandom(words);
                //console.log('  - prev2 -> ', prev2Word);
            }

            if (!prev1Word) {
                let matchByPrev2Word = chain.filter(x => x[0] === prev2Word);
                //let matchByPrev1Word = chain.filter(x => x[1] === prev2Word);

                let rndList = pickRandom(matchByPrev2Word);
                //console.log('  - prev1 -> 1 ', rndList);
                prev1Word = rndList[1];
                //console.log('  - prev1 -> ', prev1Word);
            }

            let nextWordsAvailable = analyze.nextWords(chain,
                prev2Word, prev1Word);
            //console.log(' :', nextWordsAvailable);
            word = nextWordsAvailable[0];
            if (!word) {
                prev2Word = null;
                prev1Word = null;
                break;
            }

            //console.log('  --> ', word, '\n');
            result.push(word);

            prev2Word = prev1Word;
            prev1Word = word;

        }

        console.log('\n# ' + result.join(' ') + '.');
    });

});
