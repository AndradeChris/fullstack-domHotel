import express from 'express'
import FuncionariosController from '../controller/funcionariosController.js'
import decrypt from '../middlewares/decrypt.js'

const router = express.Router()

router
  .get('/funcionarios', FuncionariosController.getWorkers)
  .get('/funcionariosAtivos', FuncionariosController.getActiveWorkers)
  .post('/funcionariosCadastro', decrypt, FuncionariosController.postNewWorkers)
  .put('/funcionariosAtualiza', FuncionariosController.updateWorkers)

export default router