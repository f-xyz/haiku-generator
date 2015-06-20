require('chai').should();
const tokenize = require('../tokenize');

describe('tokenizer tests', () => {

    it('makes word list from a string', () => {
        const data = 'a  bc';
        const tokens = tokenize.words(data);
        tokens.should.eql(['a', 'bc']);
    });

    it('returns [] on empty input', () => {
        const data = '';
        const tokens = tokenize.words(data);
        tokens.should.eql([]);
    });

    it('supports signs ' + tokenize.signs, () => {
        it('makes word list from a string', () => {
            const data = ', - .';
            const tokens = tokenize.words(data);
            tokens.should.eql([',', '-', '.']);
        });
    });

    it('supports chars' + tokenize.chars, () => {
        const data = 'зх’їєфійъхфьёыъ зх’їєфійъхфьёыъ';
        const tokens = tokenize.words(data);
        tokens.should.eql(['зх’їєфійъхфьёыъ', 'зх’їєфійъхфьёыъ']);
    });
});

describe('tokenizer benchmark', function () {

    it('!', function () {

    });

});
