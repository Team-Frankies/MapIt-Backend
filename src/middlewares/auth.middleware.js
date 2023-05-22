import HttpStatus from 'http-status-codes'
import * as authService from '../services/auth.service.js'

export function verifyToken (req, res, next) {
  const headers = req.headers

  if (headers && headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    const token = headers.authorization.split(' ')[1]
    const verifiedToken = authService.jwtVerifyToken(token)
    if (!verifiedToken.uuid) {
      invalidToken(req, res)
    } else {
      req.isLogged = true
      next()
    }
  } else {
    invalidToken(req, res)
  }
}

function invalidToken (req, res) {
  req.isLogged = false
  const message = {
    message: 'The token is invalid or it has expired'
  }
  res.status(HttpStatus.UNAUTHORIZED).json(message)
}
