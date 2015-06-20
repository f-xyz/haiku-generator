/*
 * Finite-state machine in ES 6 experiment.
 * By f_xyz.
 */

const _ = require('lodash');
require('chai').should();

const isWord = (char) => /[\w]/i.exec(char);
const isSign = (char) => /[,.]/.exec(char);
const isWhitespace = (char) => !isWord(char) && !isSign(char);

const exec = (f, item, list) => f ? f(item, list) : false;

const fsm = (list, definition, initialStateName) => {

    let statesByName = _(definition)
        .groupBy(x => x.name)
        .mapValues(x => x[0])
        .value();

    let currentState = statesByName[initialStateName];

    for (let i = 0; i < list.length; ++i) {
        let item = list[i];

        for (let j = 0; j < currentState.actions.length; ++j) {
            let action = currentState.actions[j];

            if (exec(action.when, item, list)) {
                return false;
            }

            exec(action.then, item, list);

            if (action.state) {
                currentState = statesByName[action.state];
            }
        }
    }
};

describe('# experiments ' + new Date, function () {

    const definition = [
        {
            name: 'initial',
            actions: [
                {
                    when: (x) => true,
                    then: () => { console.log('111'); console.log('222') },
                    state: 'state-1'
                }
            ]
        }, {
            name: 'state-1',
            actions: []
        }
    ];

    const data = [111, 222];

    it('111', function () {
        let iterator = fsm(data, definition, 'initial');
        //result.should.eq
    });

});
