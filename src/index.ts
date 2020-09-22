import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import LOGGER from './Logger'
import Postgres from "./database/Postgres";

// ROUTERS
import proxyRouter from './routes/proxy'
import Redis from "./database/Redis";

const port = process.env.PORT || 5000

const app = express()

// Use Middleware
app.use(bodyParser.json({limit: '50mb'}))
app.use(morgan('tiny'))

class Api {
    async start() {

        // Setup database and redis cache
        await Postgres.connect()
        Redis.getInstance()

        // Register Routes
        app.use('/api/proxy', proxyRouter)

        app.listen(port, () => LOGGER.info(`Running on http://localhost:${port}`))
    }
}

new Api().start()