import express from 'express'
import routes from './routes/index.js'
import { config } from './config/env.js'
import RabbitMQService from './services/rabbitmq.service..js'

const app = express()

app.use(express.json())

RabbitMQService.getInstance().initialize()

app.use('/', routes)

app.listen(config.port, () => console.log(`Payment service started at port ${config.port}`))