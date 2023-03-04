import nodemailer from 'nodemailer'

export const enviarCorreo = async (destinatario,texto)=> {
  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  transportador.sendMail({
    subject:'Bienvenido a la aplicacion de calendarios',
    text: texto,
    to: destinatario,
    from: process.env.EMAIL_USER
  })
  console.log(resultado)
}