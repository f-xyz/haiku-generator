const Chain = require('../src/chain');

describe('Chain', () => {

    const word = 'a';
    const prevWord = 'b';
    const prevPrevWord = 'c';

    it('constructor with arguments', () => {
        const chain = new Chain(word, prevWord, prevPrevWord);
        chain.word.should.eq(word);
        chain.prevWord.should.eq(prevWord);
        chain.prevPrevWord.should.eq(prevPrevWord);
    });
    it('default constructor', () => {
        const chain = new Chain();
        chain.word.should.eq('');
        chain.prevWord.should.eq('');
        chain.prevPrevWord.should.eq('');
    });
    it('factory', () => {
        const chain = Chain.factory(word, prevWord, prevPrevWord);
        chain.word.should.eq(word);
        chain.prevWord.should.eq(prevWord);
        chain.prevPrevWord.should.eq(prevPrevWord);
    });
    it('valueOf() test', () => {
        const chain = Chain.factory(word, prevWord, prevPrevWord);
        const valueOf = chain.valueOf();
        valueOf.should.eql([prevPrevWord, prevWord , word]);
    });
});