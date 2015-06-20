require('chai').should();
const fsm = require('../fsm');

describe('finite-state machine tests', function () {

    it('is a function', function () {
        fsm.should.be.a('function');
    });

    it('executes current state\'s action', function () {

    });

    xit('changes state using condition', function () {
        const states = {
            NORMAL: {

            }
        };
    });

});