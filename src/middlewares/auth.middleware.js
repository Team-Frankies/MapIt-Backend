function verify_token(req, res, next){
    const bearer_header = req.headers['authorization']
    if (typeof bearer_header !== 'undefined'){
        const bearer = bearer_header.split(" ")
        const bearer_token = bearer[1]
        req.token = bearer_token
        next()
    } else {
        const message = {
            message: 'Debe ingresar un Token'
        }
        res.status(403).json(message)
    }
}

function check_obeject(req, res, next){
    const account = req.body
    if (Object.keys(account).length === 0 ){
        const message = {
            message: 'Debe proporcionar un objeto'
        }
        res.status(400).json(message)
    } else if (Object.keys(account).length > 4){
        const message = {
            message: 'Solo se permite: Email, Nombre, Apellido y Password'
        }
        res.status(400).json(message)
    } else if (Object.keys(account).length < 4){
        const message = {
            message: 'Faltan parametros en el objeto (Email, Nombre, Apellido y Password)'
        }
        res.status(400).json(message)
    } else {
        next()
    }
}

export { verify_token, check_obeject } 