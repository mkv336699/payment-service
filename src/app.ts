import express from 'express'
import routes from './routes/index.js'
import { initializeRabbitMQ } from './services/rabbitmq.js'
import { config } from './config/env.js'

const app = express()

app.use(express.json())
app.use('/', routes)

initializeRabbitMQ()

app.listen(config.port, () => console.log(`Payment service started at port ${config.port}`))