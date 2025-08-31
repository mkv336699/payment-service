import RabbitMQService from "../services/rabbitmq.service..js"

export const initiatePayment = (order: any) => {
    // initiate Razorpay, Pyapal, etc
    // Handle retries
    // Maybe store logs ?

    console.log(`Initiating payment of Rs ${order.amount}`)

    setTimeout(() => {
        RabbitMQService.getInstance().publish('orders', { paymentStatus: true })
    }, 5000)
}