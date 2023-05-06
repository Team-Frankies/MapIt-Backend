import HttpStatus from 'http-status-codes';
import * as userService from '../services/auth.service.js';

export async function createUser(req, res) {
  try {
    const newUser = await userService.createUser(req.body);
    const savedUser = await newUser.save();
    const token = await userService.getToken(savedUser._id);
    return res.status(HttpStatus.CREATED).json({token});
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}

export async function signIn(req, res) {
  try {
    const token = await userService.signIn(req, res);
    console.log({REQ: req.user});
    return res.status(HttpStatus.OK).json({token});
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}
