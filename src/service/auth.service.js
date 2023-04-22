// Node Modules
import jwt from 'jsonwebtoken'

class AuthService {

    Get_Token(account){
        const data_to_sign = {email: account.email, nombre: account.name, apellido: account.lastName}
        const token = jwt.sign(data_to_sign, process.env.SECRET_KEY)
        return { token }
    }

}

export default AuthService