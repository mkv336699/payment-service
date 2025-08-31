import { Connection } from 'rabbitmq-client'
import { initiatePayment } from '../controllers/payments.js'

class RabbitMQService {
	private static instance: RabbitMQService | null = null

	private connection: Connection | null = null
	private publisher: any = null
	private consumer: any = null

	// singleton approach, where we use one obj throughout the server's lifecycle
	public static getInstance(): RabbitMQService {
		if (!RabbitMQService.instance) {
			RabbitMQService.instance = new RabbitMQService()
		}
		return RabbitMQService.instance
	}

	public initialize(): void {
		if (this.connection) {
			return
		}

		const rabbit = new Connection('amqp://guest:guest@localhost:5672')
		this.connection = rabbit

		rabbit.on('error', (err) => {
			console.log('RabbitMQ connection error', err)
		})

		rabbit.on('connection', () => {
			console.log('RabbitMQ connection successfully (re)established')
		})

		// Consumer
		this.consumer = rabbit.createConsumer({
			queue: 'payments',
			queueOptions: { durable: true },
		}, async (msg) => {
			console.log('received message (user-events)', msg)
			if (msg && msg.body && msg.body.order) {
				initiatePayment(msg.body)
			}
		})

		this.consumer.on('error', (err: unknown) => {
			console.log('consumer error (user-events)', err)
		})

		// Publisher
		this.publisher = rabbit.createPublisher({
			confirm: true,
			maxAttempts: 2,
			exchanges: [{ exchange: 'my-events', type: 'topic' }]
		})
	}

	public async publish(routingKey: string, payload: unknown): Promise<void> {
		if (!this.publisher) {
			throw new Error('RabbitMQ publisher not initialized')
		}
		await this.publisher.send(routingKey, payload)
	}

	public async shutdown(): Promise<void> {
		try {
			if (this.publisher && typeof this.publisher.close === 'function') {
				await this.publisher.close()
			}
			if (this.consumer && typeof this.consumer.close === 'function') {
				await this.consumer.close()
			}
			if (this.connection) {
				await this.connection.close()
			}
		} catch (err) {
			console.log('Error while shutting down RabbitMQ resources', err)
		} finally {
			this.publisher = null
			this.consumer = null
			this.connection = null
		}
	}
}

export default RabbitMQService


