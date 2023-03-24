import { createTransport } from 'nodemailer'

const transporter = createTransport({
  service: 'outlook',
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export default transporter