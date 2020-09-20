import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import LOGGER from './Logger'
import Postgres from "./database/Postgres";

const port = process.env.PORT || 5000;

const app = express();
// Use Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(morgan('tiny'));

class Api {
    async start() {
        await Postgres.connect();
        app.listen(port, () => LOGGER.info(`Running on http://localhost:${port}`));
    }
}

new Api().start()

