
const markov2ndOrderSlow = (input) => [].reduce.call(
    input,
    (res, ch, i) => [...res, [input[i-2], input[i-1], ch]],
    []);


