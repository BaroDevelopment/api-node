import moment from "moment";

export default class TimeUtils {
    getTimestamp(): string {
        const format = "DD-MM-YYYY HH:mm:ss"
        const timestamp = moment(new Date()).format(format)
            .replace('-', '.')
            .replace('-', '.')
        return timestamp
    }
}