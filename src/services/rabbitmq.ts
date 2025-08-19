import { Connection } from 'rabbitmq-client'
import { config } from '../config/env.js'

export function initializeRabbitMQ() {
	const rabbit = new Connection(config.rabbitUrl)

	rabbit.on('error', (err) => {
		console.log('RabbitMQ connection error', err)
	})

	rabbit.on('connection', () => {
		console.log('RabbitMQ connection successfully (re)established')
	})

	const consumer = rabbit.createConsumer(
		{
			queue: config.queueName,
			queueOptions: { durable: true },
			qos: { prefetchCount: 2 },
			exchanges: [{ exchange: config.exchangeName, type: 'topic' }],
			queueBindings: [{ exchange: config.exchangeName, routingKey: config.routingKey }],
		},
		async (msg) => {
			console.log('received message', msg)
		}
	)

	consumer.on('error', (err) => {
		console.log('consumer error', err)
	})
}


