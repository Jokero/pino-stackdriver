'use strict';

const PINO_TO_STACKDRIVER = {
    10: 'DEBUG',
    20: 'DEBUG',
    30: 'INFO',
    40: 'WARNING',
    50: 'ERROR',
    60: 'CRITICAL',
};

module.exports = ({
                      time,
                      pid,
                      hostname,
                      level,
                      msg,
                      stack,
                      v,
                      type,
                      ...rest
                  }) => {

    let message = stack || msg;
    const output = {
        ...rest,
        severity: PINO_TO_STACKDRIVER[level] || 'UNKNOWN',
        timestamp: time,
        message,
    };

    if (stack && msg) {
        output.msg = msg;
    }

    return output;
};