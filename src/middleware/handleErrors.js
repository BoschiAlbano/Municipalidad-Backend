
const ERROR_HANDLERS = {
    ReferenceError: res => 
      res.status(400).send({ error: 'Error en la Consulta SQL, ReferenceError' }),
    CastError: res =>
      res.status(400).send({ error: 'id used is malformed' }),
  
    ValidationError: (res, { message }) =>
      res.status(409).send({ error: message }),
  
    JsonWebTokenError: (res) =>
      res.status(401).json({error: 1, mensaje: "Token Invalido"}),
  
    TokenExpirerError: res =>
      res.status(401).json({ error: 1, mensaje: 'Token Expirado' }),
  
    RequestError: res =>
    res.status(401).json({ error: 1, mensaje: 'Error en la Consulta SQL' }),

    TypeError: res =>
    res.status(401).json({ error: 1, mensaje: 'Error en la Consulta SQL' }),

    ErrorBaseDatos: res =>
    res.status(401).json({ error: 1, mensaje: 'Error en la Base de datos' }),

    TokenExpiredError: res =>
    res.status(401).json({ error: 1, mensaje: 'Token Expirado' }),
    
    defaultError: (res, error) => {
      console.error(error.name)
      res.status(500).end()
    }
}
  
module.exports = (error, request, response, next) => {
    const handler =
      ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  
    handler(response, error)
}
