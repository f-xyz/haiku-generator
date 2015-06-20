/*
 *
 */

require('colors');

const rx = /[^\wа-яёъєїі\n']/i;

const words = (input) => input
    .split(rx)
    .filter(x => !! x.trim())
    .map(x => x.toLowerCase().replace(/\n+/g, '\n'));

////////////

const chars = /[\wа-яёъєїі’]/i;
const signs = /[,.-]/;

const isWord = (char) => chars.test(char);
const isSign = (char) => signs.test(char);
const isWhitespace = (char) => !isWord(char) && !isSign(char);

const STATES = {
    wordCharacter: 'wordCharacter',
    whitespaceOrSign: 'whitespaceOrSign'
};

const fsm = () => {



    return {};
};


const words2 = (input) => {

    //console.log('\n  ' + String(Date.now()).yellow + '\n  ### INPUT'.green, input);

    let word = '';
    let result = [];
    let state = STATES.whitespaceOrSign;

    const wordAddChar = (char) => word += char;
    const wordClear = () => word = '';
    const resultAdd = (word) => result.push(word);
    const stateSet = (newState) => state = newState;

    for (let i = 0; i < input.length; ++i) {
        let char = input[i];

        //console.log('    ', result, word, char, '->', state);

        switch (true) {
            case isWhitespace(char):
                //console.log('\t\tisWhitespace(char)');
                if (state == STATES.wordCharacter) {
                    resultAdd(word);
                    wordClear();
                    stateSet(STATES.whitespaceOrSign);
                }
                break;
            case isSign(char):
                //console.log('\t\tisSign(char)');
                if (state == STATES.wordCharacter) {
                    resultAdd(word);
                    wordClear();
                    resultAdd(char);
                    stateSet(STATES.whitespaceOrSign);
                }
                break;
            case isWord(char):
                //console.log('\t\tisWord(char)');
                wordAddChar(char);
                stateSet(STATES.wordCharacter);
                break;
        }
    }

    if (word) {
        resultAdd(word);
    }

    //console.log(result);
    return result;
};

module.exports = {
    chars,
    signs,
    words: words2
};
