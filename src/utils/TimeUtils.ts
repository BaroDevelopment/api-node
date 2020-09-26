import {DateTime} from 'luxon'

export default class TimeUtils {
    // https://github.com/moment/luxon/blob/master/docs/formatting.md
    public static getTimestamp(date?: Date): string {
        const dateTime = date ?  date.toISOString() : new Date().toISOString()
        const format = "d'.'LL'.'y H':'mm':'ss"
        return DateTime.fromISO(dateTime).toFormat(format)
    }
}