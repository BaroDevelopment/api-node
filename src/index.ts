import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import LOGGER from './Logger'
import Postgres from "./database/Postgres";
import Redis from "./database/Redis";

// ROUTERS
import ProxyRouter from './routes/proxy'
import WebhookDiscordGitlabProvider from './routes/webhook/discord/providers/GitlabProvider'

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
        app.use('/api/proxy', ProxyRouter)
        app.use('/api/webhook/discord/gitlab/', WebhookDiscordGitlabProvider)

        app.listen(port, () => LOGGER.getInstance().info(`Running on http://localhost:${port}`))
    }
}

new Api().start()