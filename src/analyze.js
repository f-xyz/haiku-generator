var _ = require('lodash');
var utils = require('./utils');

const makeItem = (__, i, input) => [input[i-2], input[i-1], input[i]];
const compile = (input) => input.map(makeItem).slice(2);

const compile2 = (input) => {
    let result = [];
    for (let i = 2; i < input.length; ++i) {
        result.push([input[i-2], input[i-1], input[i]]);
    }
    return result;
};

var mb = require('micro-benchmark');
var N = 1e0;
var input = new Array(1000);
mb.suite({
    report: true,
    repeat: 1,
    limitTime: 100,
    limitOps: 1000,
    barWidth: 20,
    specs: [
        () => compile(input),
        () => compile2(input)
    ]
});

const findPossibleFirstWords = (chain) => {
    let result = [];

    for (let i = 0; i < chain.length; ++i) {
        const item = chain[i];
        result.push(item[2]);
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

module.exports = {
    compile,
    findPossibleFirstWords,
    findPossibleSecondWords,
    findPossibleNextWords
};
