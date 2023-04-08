import { verify } from "jsonwebtoken"
import sqlDB from '../app/mysql.js'
import createRefreshToken from "../utils/createRefreshoken.js"
import createToken from "../utils/createToken.js"

export default class RefreshTokenController {

    static refreshToken = async (req, res) => {

        const refreshTokenBody = req.body.refreshToken
        const payload = await verify(refreshTokenBody, process.env.SECRET_REFRESH_TOKEN)

        if (!payload) {
            res.status(400).send({ message: 'Error ao autenticar', error: err.message })
            return
        }

        sqlDB.query(`SELECT * FROM 'users_token'`, (err, data) => {
            if (err) {
                res.status(400).send({ message: 'Refresh token não encontrado', error: err.message })
                return
            }

            let resultUser

            data.map((users) => {
                if (users.id === payload.id && users.refresh_token === refreshTokenBody) {
                    resultUser = users.id
                }
            })          


            sqlDB.query(`DELETE * FROM 'users_token' WHERE 'id' = ${}`, (err, data) => {
                if (err) {
                    res.status(400).send({ message: 'Error ao autenticar', error: err.message })
                    return
                }


                const newRefreshToken = createRefreshToken(payload)

                const refreshTokenDays = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));

                sqlDB.query('INSERT INTO `users_token` (refresh_token, user_id, expires_date) VALUES (?, ?, ?)', [newRefreshToken, resultUser, refreshTokenDays], (err, data) => {

                    if (err) {
                        res.status(401).send({
                            status: 401,
                            message: 'Usuário não autorizado',
                            error: err.message
                        })
                        return
                    }

                    const newToken = createToken(payload)

                    res.json({
                        status: 200,
                        message: 'Refresh Token Sucess',
                        data: payload,
                        token: newToken,
                        refreshToken: newRefreshToken
                    })
                })

            })
        })
    }
}