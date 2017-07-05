'use strict';

const time = {
    expiry:       60,
    timers:       { },
    start:        () => time.startup = Date.now() / 1000,
    getDelay:     timestamp => (Date.now() / 1000) - timestamp,
    isExpired:    timestamp => timestamp < time.startup || time.getDelay(timestamp) > time.expiry,
    startTimer:   key => time.timers[key] = process.hrtime(),
    resolveTimer: key => {
        let timer = process.hrtime(time.timers[key]);
        return (1000 * timer[0] + timer[1] / 1e6).toFixed(2);
    }
};

module.exports = time;
