export const config = {
	port: Number(process.env.PORT) || 3001,
	rabbitUrl: process.env.RABBIT_URL || 'amqp://guest:guest@localhost:5672',
	exchangeName: process.env.RABBIT_EXCHANGE || 'my-events',
	queueName: process.env.RABBIT_QUEUE || 'payment',
	routingKey: process.env.RABBIT_ROUTING_KEY || 'users.*',
}


