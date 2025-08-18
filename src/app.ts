import express from 'express'
import { initialiZeRabbitMQ } from './service/rabbitmq-service.js'

const app = express()

app.get("/", (req, res) => {
    res.json({ "success": true, "message": "Payment service is healthy and running" })
})

initialiZeRabbitMQ()

app.listen(3001, () => console.log("Payment service started at port 3001"))