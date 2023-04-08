import express from 'express'
import RefreshTokenController from '../controller/refreshTokenController.js'

const router = express.Router()

router.post('/refresh-token', RefreshTokenController.refreshToken)

export default router
