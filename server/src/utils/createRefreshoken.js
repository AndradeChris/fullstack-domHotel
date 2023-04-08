import jwt from 'jsonwebtoken'

const secret = process.env.SECRET_REFRESH_TOKEN

const createRefreshToken = (obj) => {

  const options = {
    expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN
  }

  return jwt.sign(obj, secret, options)
}

export default createRefreshToken
