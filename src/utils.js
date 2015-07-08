const colors = require('colors');
const floor = Math.floor;
const random = Math.random;

const randomInt = (max) => floor(random() * max);
const randomItem = (list) => list[randomInt(list.length)];

const vowels = 'aeyuio' + 'уеїіаоеєяиюёыэ';
const isVowel = (char) => vowels.indexOf(char) > -1;
const plus1IfVowel = (res, char) => vowels.indexOf(char) > -1 ? ++res : res;
const reduceStr = (fn, str, initial) => [].reduce.call(str, fn, initial);

//const syllablesCount = (word) =>
//    reduceStr(plus1IfVowel, word, 0);

function syllablesCount(word) {
    let res = 0;
    for (let i = 0; i < word.length; i++) {
        if (isVowel(word[i])) {
            res++;
        }
    }
    return res;
}

module.exports = {
    randomInt,
    randomItem,
    syllablesCount
};
