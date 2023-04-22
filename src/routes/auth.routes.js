// Node Modules
import express, { application } from 'express'
const router = express.Router()

import AuthService from '../service/auth.service.js'
const auth_service = new AuthService()

router.post('/sign-up', async (req, res) => {
    const account = req.body
    const get_tokenn = await auth_service.Get_Token(account)
    res.status(201).json(get_tokenn)
})

export default router