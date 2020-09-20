import {Client} from 'pg'
import LOGGER from '../Logger'

/**
 * Singleton class
 */
export default class Postgres {

    private static instance: Client

    private constructor() {
    }

    static getInstance(): Client {
        if (!Postgres.instance){
            Postgres.instance = new Client(process.env.PG_CONNECTION_STRING);
        }
        return Postgres.instance
    }

    static async connect(){
        Postgres.getInstance().connect()
            .then(() => LOGGER.info(`Connected to Database`))
            .catch(err => LOGGER.error(`Unable to connect to the database:`))
    }
}