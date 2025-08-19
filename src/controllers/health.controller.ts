import { Request, Response } from 'express'

export function getHealth(req: Request, res: Response) {
	res.json({ success: true, message: 'Payment service is healthy and running' })
}


