import express from 'express'
import cors from '../middlewares/cors.js'
import comentarios from './comentarios.js'
import consumo from './consumo.js'
import contato from './contato.js'
import funcionarios from './funcionarios.js'
import login from './login.js'
import refreshToken from './refreshToken.js'
import reservas from './reservas.js'
import signup from './signup.js'
import user from './user.js'

const routes = app => {
  app.route('/').get((_req, res) => {
    res.status(200).send({
      text: 'Default endpoint'
    })
  })

  app.use(
    cors,
    express.json(),
    reservas,
    comentarios,
    login,
    signup,
    funcionarios,
    consumo,
    user,
    contato,
    refreshToken,
  )
}

export default routes
