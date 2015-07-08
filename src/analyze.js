const utils = require('./utils');

const compile = (input) => {
    let result = [];
    for (let i = 2; i < input.length; ++i) {
        result.push([input[i-2], input[i-1], input[i]]);
    }
    return result;
};

const findPossibleNextWords = (chain, prev2, prev1) => {
    let result = [];
    for (let i = 0; i < chain.length; ++i) {
        const item = chain[i];
        if (item[0] == prev2 && item[1] == prev1) {
            result.push(item[2]);
        }
    }
    return result;
};

const findPossibleSecondWords = (chain, prev2) => {
    let result = [];
    for (let i = 0; i < chain.length; ++i) {
        const item = chain[i];
        if (item[0] == prev2 && result.indexOf(item[1]) == -1) {
            result.push(item[1]);
        }
    }
    return result;
};

module.exports = {
    compile,
    findPossibleNextWords,
    findPossibleSecondWords
};
