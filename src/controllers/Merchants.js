const Status = require('http-status')
const bcrypt = require ('bcrypt')
const jwtConfig = require('../config/jwt')
const jwt = require('jsonwebtoken')
const merchantModels = require('../models/Merchants')
const crypto = require('crypto');
const mails = require('../controllers/mailtamplets')



exports.createMerchant = (req, res, next ) => {

  const password = req.body.password
  const password2 = req.body.password2
  const email = req.body.email
  const cnpj = req.body.cnpj
  const rs = req.body.rs
  const fantasia =  req.body.fantasia
  const responsavel = req.body.responsavel
  const cpfcnpj = req.body.cpfcnpj
  const idreferral = makeid(20)
  const referenciado = req.body.referral
  const merchantKey = makeid(50)
  const pubkey = makeid(60)
  const privkey = makeid(60)

  trueID(15)
  .then((merchantId)=>{

    if(email && password ) {
      if(password == password2){
        merchantModels.findOne({email, where: {email:email}})
          .then(merchant => {
            if(merchant) {
              res.status(409).send({sucess: false, message: 'This email is already registered'})
            } else {
              bcrypt.hash(password, 10)
              .then(hash => {
                let encryptedPassword = hash
                
                merchantModels.create({
                  merchantId: merchantId,
                  rs: rs,
                  fantasia: fantasia,
                  password:encryptedPassword,
                  email:email,
                  idreferral:idreferral,
                  referenciado:referenciado,
                  merchantKey:merchantKey,
                  responsavel:responsavel,
                  cpfcnpj:cpfcnpj,
                  pubkey:pubkey,
                  privkey:privkey
                })
                .then(()=> {
                  merchantModels.findOne({email, where: {email:email}})
                      .then(merchant => {
                        const rs = merchant.rs
                        const merchantId = merchant.merchantId
                        const merchantKey = merchant.userKey
                        const idreferral = merchant.idreferral  
                        const token = jwt.sign({merchantId}, jwtConfig.secret, {
                          expiresIn: 3000 // expires in 50min
                        });  
                        res.status(201).send({sucess: true, email:email, razao_social:rs, id:merchantId, idreferral:idreferral, pubkey: pubkey, privkey: privkey}),
                        emailconfirmUser(email, merchantKey)
                    })
                    .catch((error) => next(error))
                })
              .catch((error) => next(error))
            })
            .catch((error) => next(error))
          }
        })
      } else { 
        res.status(400).send({sucess: false, message:'Passwords doesnt match', statusCode: 400})
      }
    } else {
      res.status(422).send({sucess: false, message:'Email and password fields are requireds', statusCode: 422})
  }

  })
}
   
exports.updateUser = (req, res, next) => {
  const userId = req.userId
  const password = req.body.password
  const name = req.body.name
  const lastname =  req.body.lastname

  if(userId) {
  Models.findOne({userId, where: {userId:userId}})
  .then(user => {
    if(user) {
   // const userId =req.userId
    const user_id = user.userId
    if(userId==user_id) {
      bcrypt.hash(password, 10)
      .then(hash => {
        let encryptedPassword = hash
          Models.update(
            {
              password : encryptedPassword,
              name : name,
              lastname : lastname
            },
            {where: {userId:userId}}
          )
          .then( () => { 
            res.status(200).send({sucess: true, message: 'ok' , statusCode: 200})
          })
          .catch (error => next (error))
      })
      .catch (error => next (error))
        } else {
          res.status(500).send({sucess: false, message: 'id not match' , statusCode: 500})
        }
    } else {
      res.status(404).send({sucess: false, message: 'User not found by the supplied credentials' , statusCode: 404})

    }
  })
  .catch (error => next (error))
  }
}

exports.login = (req, res, next) => {

  const email = req.body.email
  const password = req.body.password

  if(email && password ) {
    Models.findOne({email, where: {email:email}})
    .then(user => {
      if(user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result==true){ 
            const role = user.role
            const name = user.name
            const userId = user.userId
            const level = user.level  
            const quotas = user.quotas
            const idreferral = user.idreferral  
            const token = jwt.sign({userId}, jwtConfig.secret, {
              expiresIn: 3000 // expires in 50min
            });
            res.status(200).send({sucess: true, email:email, name:name, role:role, id:userId, idreferral:idreferral, quotas:quotas, token: token});
          } else {
            res.status(401).send({sucess: false, message: 'User not found by the supplied credentials', statusCode: 401})
          }
        })  
      } else {
        res.status(401).send({sucess: false, message: 'User not found by the supplied credentials' , statusCode: 401})
      }
    })
    .catch((error) => next(error))
  } else {
    res.status(422).send({sucess: false, message:'Email and password are required fields', statusCode: 422})
  }
}


exports.recoveryPassword = (req, res, next ) => {

  const email = req.body.email

  if(email) {
      Models.findOne({email, where: {email:email}})
      .then(user => {
        if(user) {
          const userKey = makeid(30)
          const now = today();
              Models.update(
                {
                  userKey:userKey,
                  newKey_at:now
                },
                    {where: {email:email}}
                  )
                  .then( () => { res.status(200).send({sucess: true, message: 'An id for recovery has been sent to your email' , statusCode: 200 })},

                  emailpassRecovery(email, userKey)

                  )
                  .catch (error => next (error))
                } else {
                  res.status(404).send({sucess: false, message: 'User not found by the supplied email' , statusCode: 404})
                }
            })
        .catch((error) => next(error))
  } else {
      res.status(422).send({sucess: false, message:'Email is required', statusCode: 422})      
  }
}

exports.resetPassword = (req, res, next) => {
  const userKey = req.body.userKey
  const now = today();
  const password = req.body.password
  const password2 = req.body.password2

  if(password && password2) {
    if(password == password2){
        Models.findOne({userKey, where: {userKey:userKey}})
        .then(user => {
          if(user) {
      // const userId =req.userId
            const user_key = user.userKey
              if(userKey==user_key) {
                bcrypt.hash(password, 10)
                .then(hash => {
                  let encryptedPassword = hash
                    Models.update(
                      {
                        password : encryptedPassword,
                        resetpass_at : now,
                      },
                      {where: {userKey:userKey}}
                    )
                    .then( () => {
                         const newuserKey = makeid(30)
                          Models.update(
                            {
                              userKey:newuserKey,
                              newKey_at:now
                            },
                                {where: {userId:user.userId}}
                            )
                            .then( () => {
                              res.status(200).send({sucess: true, message: 'ok' , statusCode: 200})
                            })
                            .catch (error => next (error))
                      })
                  .catch (error => next (error))
                 })
                .catch (error => next (error))
              } else {
          res.status(500).send({sucess: false, message: 'id not match' , statusCode: 500})
        }
    } else {
      res.status(401).send({sucess: false, message: 'Invalid or expired UserKey' , statusCode: 404})
    }
    })
    .catch (error => next (error))
    } else { 
      res.status(400).send({sucess: false, message:'Passwords doesnt match', statusCode: 400})
    }
  } else {
    res.status(422).send({sucess: false, message:'Password and Password2 fields are requireds', statusCode: 422})
  }
}

exports.confirmUser = (req, res, next) => {
  const userKey = req.params.userKey
  const now = today();

    if(userKey){
        Models.findOne({userKey, where: {userKey:userKey}})
        .then(user => {
          if(user) {
        // const userId =req.userId
            const user_key = user.userKey
            const verified = 1
              if(userKey==user_key) {
                    Models.update(
                      {
                        verified : verified,
                        verified_at : now,
                      },
                      {where: {userKey:userKey}}
                    )
                    .then( () => {
                         const newuserKey = makeid(30)
                          Models.update(
                            {
                              userKey:newuserKey,
                              newKey_at:now
                            },
                                {where: {userId:user.userId}}
                            )
                            .then( () => {
                           //   res.status(200).send({sucess: true, message: 'User successfully verified' , statusCode: 200})
                           res.writeHead(302,
                                {Location: 'https://patron.bzlcoin.org/user/login/cofirm:/'}
                              );
                              res.end();
                            })
                            .catch (error => next (error))
                      })
                  .catch (error => next (error))
                 }
              } else {
                //res.status(401).send({sucess: false, message: 'Invalid or expired UserKey' , statusCode: 401})
                  res.writeHead(301,
                    {Location: 'https://patron.bzlcoin.org/user/login/cofirm/'}
                  );
                  res.end();
                }
                })
                      .catch (error => next (error))
          } else {
                //   res.status(401).send({sucess: false, message: 'Invalid or expired UserKey' , statusCode: 404})
              res.writeHead(301,
                {Location: 'https://patron.bzlcoin.org/user/login/cofirm/'}
              );
              res.end();
  } 
}