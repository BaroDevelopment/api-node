import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import LOGGER from './Logger'

const port = process.env.PORT || 5000;

const app = express();
// Use Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(morgan('tiny'));
app.listen(port, () => LOGGER.info(`Running on http://localhost:${port}`));