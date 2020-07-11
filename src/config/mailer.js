const nodemailer = require('nodemailer') // Importa o módulo principal

exports.transporter = nodemailer.createTransport({ // Configura os parâmetros de conexão com servidor.
  host: 'host',
  port: 465,
  secure: true,
  auth: {
    user: 'bzlcoin@bzlcoin.org',
    pass: 'pass'
  }
})