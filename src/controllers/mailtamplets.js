const mailer = require('../config/mailer')
const nodemailer = require('nodemailer')



emailpassRecovery = (email, userKey) =>{
if (email && userKey) {
  const  mensagem = "<h1>Dear Patron!</h1><br><br><br><p>You (or somebody else) requested password recovery for your Patron account.<p><br><br><p>You can set a new password if you follow this link:</p><br><br><p>link</p><br><br><br><p>Please note, that this link become invalid in 10 minutes.</p><br><br><p>If you did not initiate password recovery, you can ignore this message – your password will remain unchanged.</p><br><br><br><p>Best regards, BZLcoin team</p>"

  const to = email

  const subject = 'Patron account password recovery'

  const mailOptions = {
    from: 'bzlcoin@bzlcoin.org',
    to: to,
    subject: subject,
    html: mensagem
  }
      mailer.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
        return console.log(err)
        }                
        console.log(info)
      })

  }

}

emailpassReset = (email, userKey) =>{
  if (email && userKey) {
    const  mensagem = '<p>teste</p>'
    const to = email
    const subject = 'teste'
  
    const mailOptions = {
      from: 'bzlcoin@bzlcoin.org',
      to: to,
      subject: subject,
      html: mensagem
    }
        mailer.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
          return console.log(err)
          }                
          console.log(info)
        })
    }
}


emailnewUser = (email, userKey) =>{
    if (email && userKey) {
      const  mensagem = '<p>teste</p>'
      const to = email
      const subject = 'teste'
    
      const mailOptions = {
        from: 'bzlcoin@bzlcoin.org',
        to: to,
        subject: subject,
        html: mensagem
      }
          mailer.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
            return console.log(err)
            }                
            console.log(info)
        })  
    }
}

emailconfirmUser = (email, userKey) =>{
  if (email && userKey) {
    const  mensagem = '<p>Thanks for your interest in Patron.</p><br><p>Click the link below to verify your email and get started using Patron.</p><br><br>Get started »<br> The BZL Team'
    const to = email
    const subject = 'Confirm your email'
  
    const mailOptions = {
      from: 'bzlcoin@bzlcoin.org',
      to: to,
      subject: subject,
      html: mensagem
    }
        mailer.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
          return console.log(err)
          }                
          console.log(info)
      })  
  }
}


emailupdateUser = (email, userKey) =>{
  if (email && userKey) {
    const  mensagem = '<p>teste</p>'
    const to = email
    const subject = 'teste'
  
    const mailOptions = {
      from: 'bzlcoin@bzlcoin.org',
      to: to,
      subject: subject,
      html: mensagem
    }
        mailer.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
          return console.log(err)
          }                
          console.log(info)
      })  
  }
}


emailcreateTransaction = (email, userKey) =>{
  if (email && userKey) {
    const  mensagem = '<p>teste</p>'
    const to = email
    const subject = 'teste'
  
    const mailOptions = {
      from: 'bzlcoin@bzlcoin.org',
      to: to,
      subject: subject,
      html: mensagem
    }
        mailer.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
          return console.log(err)
          }                
          console.log(info)
      })  
  }
}


emailupdateTransaction = (email, userKey) =>{
  if (email && userKey) {
    const  mensagem = '<p>teste</p>'
    const to = email
    const subject = 'teste'
  
    const mailOptions = {
      from: 'bzlcoin@bzlcoin.org',
      to: to,
      subject: subject,
      html: mensagem
    }
        mailer.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
          return console.log(err)
          }                
          console.log(info)
      })  
  }
}

emailpaymentConfirmed = (email, userKey) =>{
  if (email && userKey) {
    const  mensagem = '<p>teste</p>'
    const to = email
    const subject = 'teste'
  
    const mailOptions = {
      from: 'bzlcoin@bzlcoin.org',
      to: to,
      subject: subject,
      html: mensagem
    }
        mailer.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
          return console.log(err)
          }                
          console.log(info)
      })  
  }
}

emailpaymentCanceled = (email, userKey) =>{
  if (email && userKey) {
    const  mensagem = '<p>teste</p>'
    const to = email
    const subject = 'teste'
  
    const mailOptions = { 
      from: 'bzlcoin@bzlcoin.org',
      to: to,
      subject: subject,
      html: mensagem
    }
        mailer.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
          return console.log(err)
          }                
          console.log(info)
      })  
  }
}