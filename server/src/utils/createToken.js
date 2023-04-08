import jwt from 'jsonwebtoken'

const secret = process.env.SECRET_TOKEN

const createToken = (obj) => {

  const options = {
    expiresIn: process.env.EXPIRES_IN_TOKEN
  }

  return jwt.sign(obj, secret, options)
}

export default createToken
