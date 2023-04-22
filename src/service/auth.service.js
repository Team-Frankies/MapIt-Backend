// Node Modules
import jwt from 'jsonwebtoken'

class AuthService {

    Get_Token(account){
        const data_to_sign = {Email: account.Email, Nombre: account.Nombre, Apellido: account.Apellido}
        const token = jwt.sign(data_to_sign, process.env.SECRET_KEY)
        return { token }
    }

    Verify_Token(token){
        return jwt.verify(token, process.env.SECRET_KEY, (err, account) => {
            if (err){
                const message = {
                    message: 'Token Invalido',
                    status: false
                }
                return message
            } else {
                const message = {
                    message: 'Token Valido',
                    account
                }
                return message
            }
        })
    }

    Verify_Account(token_account, usr_account){
        const Token_Account = { ...token_account.account }
        console.log(Token_Account)
        console.log(usr_account)
        if (Token_Account.Email !== usr_account.Email){
            const message = {
                message: 'Correo Invalido',
                status: false
            }
            return message
        } else {
            const message = {
                message: 'Cuenta ok'
            }
            return message
        }
    }

}

export default AuthService