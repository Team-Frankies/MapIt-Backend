import HttpStatus from 'http-status-codes'
import * as userService from '../services/auth.service.js'

export async function createUser (req, res) {
  try {
    const newUser = await userService.createUser(req.body)
    const savedUser = await newUser.save()
    const token = await userService.getToken(savedUser._id)
    return res.status(HttpStatus.CREATED).json({ token })
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send()
  }
}

export async function signIn (req, res) {
  try {
    const userToken = await userService.signIn(req, res)
    const { id, token } = userToken
    return res.status(HttpStatus.OK).json({ id, token }).redirect('/user/:id')
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send()
  }
}

export async function signOut (req, res) {
  try {
    await userService.signOut(req, res)
    return res.status(HttpStatus.OK).json({ message: 'Session close' })
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send()
  }
}

export async function userId (req, res) {
  try {
    const user = await userService.userId(req, res)
    return res.status(HttpStatus.OK).json({ user })
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send()
  }
}

export async function updateUser (req, res) {
  try {
    const user = await userService.updateUser(req, res)
    return res.status(HttpStatus.OK).json({ user })
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send()
  }
}
