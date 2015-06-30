/*
 *
 *
 *
 *
 *
 *
 */
const utils = require('./utils');

const markov2ndOrder = (input) => {
    const result = [];
    for (let i = 2; i < input.length; ++i) {
        result.push([
            input[i - 2],
            input[i - 1],
            input[i]
        ]);
    }
    return result;
};

const nextWords = (chain, prev2, prev1) => chain
    .filter (x => x[0] == prev2 // prev. prev. words matched
               && x[1] == prev1) // prev. words matched
    .map    (x => x[2]); // take word

const equal = (x, y) => x === y;

const nextWords2 = (chain, prev2, prev1) => {
    for (let i = 0; i < chain.length; ++i) {
        const item = chain[i];
        if (item[0] == prev2 && item[1] == prev1) {
            return [item[2]];
        }
    }
    return [];
};

const build = (chain, words) => {
    let result = [];
    // prev. of prev. word,
    // prev. word
    // and word
    let firstWord, secondWord, nextWord;
    for (let i = 0; i < 12; ++i) {

        if (!firstWord) {
            firstWord = utils.randomItem(words);
        }

        if (!secondWord) {
            const matchesByFirstWord = chain.filter(x => x[0] === firstWord);
            const randomWords = utils.randomItem(matchesByFirstWord);
            secondWord = randomWords[1];
        }

        const nextWordsAvailable = nextWords(chain, firstWord, secondWord);

        nextWord = nextWordsAvailable[0];

        //console.log('  --> ', word, '\n');
        result.push(nextWord);

        firstWord = secondWord;
        secondWord = nextWord;
    }

    // post-processing
    result = result.join(' ') + '.';
    result = result.replace(/\s{2,}/g, ' ');
    result = result.replace(/\s([,.!])/g, '$1\n');
    result = result.replace(/^\s+/g, '');
    result = result.replace(/\n\s+/g, '\n');

    console.log('\n' + result + '\n');
    console.log(new Array(65).join('-'));
};

module.exports = {
    markov2ndOrder,
    nextWords,
    nextWords2,
    build
};
