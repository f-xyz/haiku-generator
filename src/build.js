import * as utils from './utils';
import * as analyze from './analyze';

/**
 * @param chain
 * @param words
 * @returns {Array}
 */
const build = (chain, words) => {
    let result = [];
    let firstWord,
        secondWord,
        nextWord;

    for (let i = 0; i < 20; ++i) {

        if (!firstWord) {
            firstWord = utils.randomItem(words);
        }

        if (!secondWord) {
            const secondWords = analyze.findPossibleSecondWords(chain, firstWord);
            secondWord = utils.randomItem(secondWords);
        }

        const nextWords = analyze.findPossibleNextWords(chain, firstWord, secondWord);

        if (nextWords.length == 0) {
            break;
        }

        nextWord = utils.randomItem(nextWords);
        result.push(nextWord);

        firstWord = secondWord;
        secondWord = nextWord;
    }

    // post-processing
    result = (result.join(' ') + '.')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s([,.!])/g, '$1\n')
        .replace(/^\s+/g, '')
        .replace(/\n\s+/g, '\n');

    return result;
};

module.exports = build;