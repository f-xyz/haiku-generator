
const markov2ndOrderSlow = (input) => [].reduce.call(
    input,
    (res, ch, i) => [...res, [input[i-2], input[i-1], ch]],
    []);


const makeItem = (_, i, input) => [input[i-2], input[i-1], input[i]];

const compile = (input) =>
    input
        .map(makeItem)
        .slice(2);

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