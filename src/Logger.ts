import winston from 'winston';
import TimeUtils from "./utils/TimeUtils";

/**
 * Singelton class
 */

export default class Logger {
    private static instance: winston.Logger

    private constructor() {
    }

    static getInstance(): winston.Logger {

        if (!Logger.instance) {
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
                        return `${TimeUtils.getTimestamp()} ${info.label}:[${info.level}]: ${info.message}`;
                    })
                )
            };
            // Create the logger
            Logger.instance = winston.createLogger(logConfiguration);
        }

        return Logger.instance
    }
}