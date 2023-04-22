// Node Modules
import express from 'express'
const router = express.Router()

import AuthService from '../service/auth.service.js'
const auth_service = new AuthService()

import verify_token from '../middlewares/auth.token.js'

router.post('/sign-up', async (req, res) => {
    const account = req.body
    const get_token = await auth_service.Get_Token(account)
    res.status(201).json(get_token)
})

router.post('/verify-token', verify_token, async (req, res) => {
    const token = req.token
    const verify_token = await auth_service.Verify_Token(token)
    if (verify_token.status === false){
        res.status(403).json(verify_token)
    } else {
        res.status(200).json(verify_token)
    }
})

export default router