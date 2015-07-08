import * as utils from './utils';
import * as analyze from './analyze';

/**
 * @param chain
 * @param words
 * @returns {Array}
 */
const build = (chain, words) => {
    let result = [];
    let firstWord = '';
    let secondWord = '';
    let nextWord = '';
    let line = '';

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

        line += nextWord;

        if (utils.syllablesCount(line) > 7) {
            result.push('\n');
            line = '';
        }

        firstWord = secondWord;
        secondWord = nextWord;
    }

    return toString(result);
};

function toString(wordsList) {
    return (wordsList.join(' ') + '.')
        .replace(/^,\s/, '')
        .replace(/\s(?=,)/g, '')
        .replace(/\n\s+/g, '\n')
        .replace(/\s?\n([,.])/g, '$1\n')
    ;
}

module.exports = build;