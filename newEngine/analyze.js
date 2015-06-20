/*
 *
 *
 *
 *
 *
 *
 */

const markov2ndOrderSlow = (input) => [].reduce.call (
    input,
    (res, ch, i) => [...res, [input[i-2], input[i-1], ch]],
    []
);

const markov2ndOrder = (input) => {
    const result = new Array(input.length);
    for (let i = 0; i < input.length; ++i) {
        result[i] = [
            input[i-2],
            input[i-1],
            input[i]
        ];
    }
    return result;
};

const markov2ndOrderObj = (input) => {
    let res = {};
    input.forEach((ch, i) => {

        const prev2 = input[i-2];
        const prev1 = input[i-1];

        if (!(prev2 in res)) {
            res[prev2] = {};
        }
        if (!(prev1 in res[prev2])) {
            res[prev2][prev1] = {};
        }
        if (!(ch in res[prev2][prev1])) {
            res[prev2][prev1][ch] = 1;
        } else {
            res[prev2][prev1][ch]++;
        }
    });
    return res;
};

const nextWords = (chain, prev2, prev1) => chain
    .filter (x => equalOrNull(x[0], prev2)
               && equalOrNull(x[1], prev1))
    .map    (x => x[2]);

const equalOrNull = (x, y) => x === y;

const nextWords2 = (chain, prev2, prev1) => {
    for (let i = 0; i < chain.length; ++i) {
        const item = chain[i];
        if (equalOrNull(item[0], prev2)
        &&  equalOrNull(item[1], prev1)) {
            return [item[2]];
        }
    }
    return [];
};

const nextWordsObj = (chain, prev2, prev1) => {
    return chain[prev2][prev1];
};

module.exports = {
    markov2ndOrderSlow,
    markov2ndOrder,
    markov2ndOrderObj,
    nextWords,
    nextWords2,
    nextWordsObj
};
