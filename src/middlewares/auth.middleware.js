import HttpStatus from 'http-status-codes'
import * as authService from '../services/auth.service.js'

export function verifyToken (req, res, next) {
  const headers = req.headers

  if (headers && headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    const token = headers.authorization.split(' ')[1]
    const verifiedToken = authService.verifyToken(token)
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
    message: 'El token ingresado es inválido o su ciclo de cida a expirado'
  }
  res.status(HttpStatus.UNAUTHORIZED).json(message)
}
