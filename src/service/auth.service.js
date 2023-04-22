// Node Modules
import jwt from 'jsonwebtoken'

class AuthService {

    Get_Token(account){
        const data_to_sign = {email: account.email, nombre: account.name, apellido: account.lastName}
        const token = jwt.sign(data_to_sign, process.env.SECRET_KEY)
        return { token }
    }

    Verify_Token(token){
        return jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err){
                const message = {
                    message: 'Token Invalido',
                    status: false
                }
                return message
            } else {
                const message = {
                    message: 'Token Valido',
                    data
                }
                return message
            }
        })
    }

}

export default AuthService