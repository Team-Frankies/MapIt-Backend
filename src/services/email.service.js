import nodemailer from 'nodemailer'

export async function sendMail (data) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    })
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_ADMIN,
      subject: data.subject,
      html: data.body
    })
    return 'Email has been sent'
  } catch (error) {
    console.log('Nodemailer error', error)
  }
}
