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

export default verify_token