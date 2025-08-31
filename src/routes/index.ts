import { Router } from 'express'

const router = Router()

router.use('/', (req, res) => {  
    res.json({ success: true, message: 'Payment service is healthy and running' })
})

export default router


