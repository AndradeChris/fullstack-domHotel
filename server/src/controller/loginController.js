import bcrypt from 'bcrypt'
import sqlDB from '../app/mysql.js'
import createRefreshToken from '../utils/createRefreshoken.js'
import createToken from '../utils/createToken.js'

class LoginController {
  static default = (req, res) => {
    const { email, password } = req.body
    const isAdmin = req.query.admin !== undefined
    const table = isAdmin ? 'admin_workers' : 'user'

    try {
      if (!email || !password) {
        res.status(400).json({ message: 'Invalid request' })
        return
      }

      const defaultValidations = (err, data) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: err.message
          })
          return false
        }

        if (data.length <= 0) {
          res.status(500).json({
            status: 500,
            message: 'Senha ou email incorretos'
          })
          return false
        }

        return true
      }

      sqlDB.query('SELECT name,password,ativo,id FROM ?? WHERE `email` = ? LIMIT 1', [table, email], async (err, data) => {

        if (defaultValidations(err, data) === false) return

        if (!data[0].ativo) {
          res.status(500).json({
            status: 500,
            message: 'Usuário desativado'
          })
          return
        }

        const isMatch = await bcrypt.compare(password, data[0].password)

        if (!isMatch) {
          res.status(500).json({
            status: 500,
            message: 'Senha incorreta'
          })
          return
        }

        const getIdOffice = async () => {
          return new Promise(resolve => {
            sqlDB.query('SELECT `id_office` FROM `workers_offices` WHERE `id_worker` = ? LIMIT 1', [data[0].id], (err, data) => {

              if (defaultValidations(err, data) === false) {
                return
              }

              resolve(data[0].id_office)

            })
          })
        }


         const token = createToken({
          name: data[0].name,
          email,
          id: data[0].id,
          ...(isAdmin && {
            admin: true,
            id_office: await getIdOffice()
          })
        })

        const refreshToken = createRefreshToken({
          name: data[0].name,
          email,
          id: data[0].id,
          ...(isAdmin && {
            admin: true,
            id_office: await getIdOffice()
          })
        })

        const refreshTokenDays = new Date(new Date().getTime()+(3*24*60*60*1000));

        sqlDB.query('INSERT INTO `users_token` (refresh_token, user_id, expires_date) VALUES (?, ?, ?)', [refreshToken, data[0].id, refreshTokenDays], (err, data) => {

          if(err) {
            res.status(401).send({
              status: 401,
              message: 'Usuário não autorizado',
              error: err.message
            })
            return
          }       
        })    
        
        sqlDB.query('UPDATE ?? SET `lastLogin` = ? WHERE `email` = ?', [table, new Date(), email], async err => {
          if (err) {
            res.status(500).send({
              status: 500,
              message: err.message
            })
            return
          }

          res.status(200).json({
            status: 200,
            message: 'Login realizado com sucesso',
            data: {
              name: data[0].name,
              id_user: data[0].id,
              ...(isAdmin && {
                admin: true,
                id_office: await getIdOffice()
              })
            },
            token,
            refreshToken
          })
        })
      })
    } catch (err) {
      res.status(500).send({
        status: 500,
        message: err.message
      })
    }
  }
}

export default LoginController
