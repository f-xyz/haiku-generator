require('chai').should();
const tokenize = require('../tokenize');

describe('tokenizer tests', () => {

    it('returns [] on empty input', () => {
        const data = '';
        const tokens = tokenize.words(data);
        tokens.should.eql([]);
    });

    it('makes word list from a string', () => {
        const data = 'a  bc';
        const tokens = tokenize.words(data);
        tokens.should.eql(['a', 'bc']);
    });

    it('supports signs ' + tokenize.signs, () => {
        it('makes word list from a string', () => {
            const data = 'ab-.,:';
            const tokens = tokenize.words(data);
            tokens.should.eql(['ab', ',', '-', '.']);
        });
    });

    it('supports chars ' + tokenize.chars, () => {
        const data = 'зх’їєфійъхфьёыъ зх’їєфійъхфьёыъ';
        const tokens = tokenize.words(data);
        tokens.should.eql(['зх’їєфійъхфьёыъ', 'зх’їєфійъхфьёыъ']);
    });

    it('everything is lower cased', function () {
        const data = 'A  Bc зх’їєфійъхфьёыъ зх’їєфійъхфьёыъ';
        const tokens = tokenize.words(data);
        tokens.should.eql(['a', 'bc', 'зх’їєфійъхфьёыъ', 'зх’їєфійъхфьёыъ']);
    });
});