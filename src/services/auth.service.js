// Node Modules
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model.js';

export async function createUser(user) {
  const {email} = user;
  try {
    const userDB = await User.findOne({email});
    if (!userDB) {
      const newUser = await new User(user);
      return newUser;
    }
  } catch (error) {
    return error;
  }
}

export async function signIn(req, res) {
  const {email, password} = req.body;
  try {
    const userDB = await User.findOne({email});
    const passwordMatch = await userDB.comparePassword(password);
    if (!userDB || !password || !passwordMatch) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({message: 'Fallo la autentificación. El email o la contraseña son incorrectos.'});
    }
    const token = await getToken(userDB._id);
    return token;
  } catch (error) {
    return error;
  }
}

export async function getToken(uuid) {
  return await jwt.sign(
    {
      uuid,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    },
    process.env.SECRET_KEY
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return error;
  }
}

export function Verify_Token(token) {
  return jwt.verify(token, process.env.SECRET_KEY, (err, account) => {
    if (err) {
      const message = {
        message: 'Token Invalido',
        status: false,
      };
      return message;
    } else {
      const message = {
        message: 'Token Valido',
        account,
      };
      return message;
    }
  });
}

export function Verify_Account(token_account, usr_account) {
  const Token_Account = {...token_account.account};
  if (Token_Account.Email !== usr_account.Email) {
    const message = {
      message: 'Correo Invalido',
      status: false,
    };
    return message;
  } else {
    const message = {
      message: 'Cuenta ok',
    };
    return message;
  }
}
