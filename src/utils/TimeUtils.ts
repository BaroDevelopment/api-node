import {DateTime} from 'luxon'

export default class TimeUtils {
    getTimestamp(): string {
        const format = "d'.'LL'.'y H':'mm':'ss"
        return DateTime.fromISO(new Date().toISOString()).toFormat(format)
    }
}