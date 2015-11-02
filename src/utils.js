const colors = require('colors');
const floor = Math.floor;
const random = Math.random;

const vowels = 'aeyuio' + 'уеїіаоеєяиюёыэ';

const randomInt = (max) => floor(random() * max);
const randomItem = (list) => list[randomInt(list.length)];

const isVowel = (char) => vowels.indexOf(char) > -1;

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
