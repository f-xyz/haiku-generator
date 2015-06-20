'use strict';

function profile(fn, duration) {
    duration = duration || 100;
    var maxOperations = 1000;
    var started = Date.now();
    var operations = 0;
    var elapsed;

    while (true) {

        fn();
        operations++;
        elapsed = Date.now() - started;

        if (elapsed > duration || operations > maxOperations) {
            break;
        }
    }
    return {
        fps: operations / elapsed * 1000,
        time: elapsed / operations
    };
}

function report(name, p) {
    return "" + name + " -> " + ("" + p.time.toFixed(2) + " ms, ") + ("" + p.fps.toFixed(2) + " ops");
}

module.exports = {
    profile: profile,
    report: report
};

