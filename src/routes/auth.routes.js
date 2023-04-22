// Node Modules
import express from 'express'
const router = express.Router()

import AuthService from '../service/auth.service.js'
const auth_service = new AuthService()

import { verify_token, check_obeject } from '../middlewares/auth.middleware.js'

router.post('/sign-up', check_obeject, async (req, res) => {
    const account = req.body
    const get_token = await auth_service.Get_Token(account)
    res.status(201).json(get_token)
})

router.get('/verify-token', verify_token, async (req, res) => {
    const token = req.token
    const verify_token = await auth_service.Verify_Token(token)
    if (verify_token.status === false){
        res.status(403).json(verify_token)
    } else {
        res.status(200).json(verify_token)
    }
})

router.post('/verify-account',verify_token, check_obeject, async (req, res) => {
    const token = req.token
    const account = req.body
    const verify_usrToken = await auth_service.Verify_Token(token)
    if (verify_usrToken.status !== false){
        const check_account = await auth_service.Verify_Account(verify_usrToken, account)
        if (check_account === false){
            res.status(403).json(check_account)
        } else {
            res.status(200).json(check_account)
        }
    } else {
        res.status(403).json(verify_usrToken)
    }
})

export default router