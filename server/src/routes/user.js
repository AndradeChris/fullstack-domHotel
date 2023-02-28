import express from 'express'
import UserController from '../controller/userController.js'

const router = express.Router()

router.get('/active-user', UserController.getUsersNumber)

export default router
