/*
 *
 */

const signs = /[\-,]/;
const chars = /[\wа-яёъєїі’]/i;

const isWord = (char) => chars.test(char);
const isSign = (char) => signs.test(char);
const isWhitespace = (char) => !isWord(char) && !isSign(char);

const STATES = {
    wordCharacter: 'wordCharacter',
    whitespaceOrSign: 'whitespaceOrSign'
};

const words = (input) => {

    let word = '';
    let result = [];
    let state = STATES.whitespaceOrSign;

    const wordAddChar = (char) => word += char;
    const wordClear = () => word = '';
    const resultAdd = (word) => result.push(word.toLocaleLowerCase());
    const stateSet = (newState) => state = newState;

    for (let i = 0; i < input.length; ++i) {
        const char = input[i];

        switch (true) {

            case isWord(char):
                wordAddChar(char);
                stateSet(STATES.wordCharacter);
                break;

            case isSign(char):
                if (state == STATES.wordCharacter) {
                    resultAdd(word);
                    wordClear();
                    stateSet(STATES.whitespaceOrSign);
                }
                resultAdd(char);
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

export default {
    chars,
    signs,
    words
};
