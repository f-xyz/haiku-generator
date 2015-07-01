/*
 *
 */

const signs = /[,\n-]/;
const chars = /[\wа-яёъєїі’]/i;

const isWord = (char) => chars.test(char);
const isSign = (char) => signs.test(char);
const isWhitespace = (char) => !isWord(char) && !isSign(char);

const STATES = {
    wordCharacter: 'wordCharacter',
    whitespaceOrSign: 'whitespaceOrSign'
};

const wordsFSM = (input) => {
    let word = '';
    let result = [];
    let state = STATES.whitespaceOrSign;

    const wordAddChar = (char) => word += char;
    const wordClear = () => word = '';
    const resultAdd = (word) => result.push(word.toLocaleLowerCase());
    const stateSet = (newState) => state = newState;

    for (let i = 0; i < input.length; ++i) {
        let char = input[i];

        switch (true) {

            case isWord(char):
                wordAddChar(char);
                stateSet(STATES.wordCharacter);
                break;

            case isSign(char):
                if (state == STATES.wordCharacter) {
                    resultAdd(char);
                    resultAdd(word);
                    wordClear();
                    stateSet(STATES.whitespaceOrSign);
                }
                break;

            case isWhitespace(char):
                if (state == STATES.wordCharacter) {
                    resultAdd(word);
                    wordClear();
                    stateSet(STATES.whitespaceOrSign);
                }
                break;
        }
    }

    if (word) {
        resultAdd(word);
    }

    return result;
};

module.exports = {
    chars,
    signs,
    words: wordsFSM
};