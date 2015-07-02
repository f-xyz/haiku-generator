export class Chain {

    constructor(word, prevWord, prevPrevWord) {
        this.word = word || '';
        this.prevWord = prevWord || '';
        this.prevPrevWord = prevPrevWord || '';
    }

    valueOf() {
        return [this.prevPrevWord, this.prevWord, this.word];
    }

    static factory(word, prevWord, prevPrevWord) {
        return new Chain(word, prevWord, prevPrevWord);
    }
}