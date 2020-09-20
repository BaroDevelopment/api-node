import winston from 'winston';
import TimeUtils from "./utils/TimeUtils";

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
    silly: 'blue'
})

// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.Console({
            level: 'silly'
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.label({label: ''}),
        winston.format.printf((info: any) => {
            return `${new TimeUtils().getTimestamp()} ${info.label}:[${info.level}]: ${info.message}`;
        })
    )
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

export default logger;