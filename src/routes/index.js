const express = require('express');
const transactions = require('../controllers/Transactions')
const merchants = require('../controllers/Merchants') 
const controller =require('../controllers/index')
const ipn =require('../controllers/Ipn')
const router = express.Router()



// transacoes


router.post('/v1/transactions', controller.verifyHmac, transactions.createTx) // create transaction

router.post('/v1/hmac',transactions.hmac) // test hmac

router.post('/v1/transaction&status', controller.verifyHmac, transactions.statusTx) // update transaction

//router.post('/v1/transaction', controller.apikey, controller.verifyJWT, transactions.findone ) // find one transaction

router.post('/v1/transactions&all', controller.verifyHmac, transactions.listallTx) // find all transaction



// users

router.post('/v1/merchant',controller.apikey, merchants.createMerchant) // Creating a new Merchant


//router.get('/v1/users/confirm/:userKey', users.confirmUser) // Creating a new user

//router.post('/v1/users/recoverypassword', controller.apikey, users.recoveryPassword) // recovery password

//router.put('/v1/users/resetpassword', controller.apikey, users.resetPassword) // recovery password

//router.post('/v1/users/auth',controller.apikey, users.login) //login

//router.put('/v1/users',controller.apikey, controller.verifyJWT, users.updateUser) // Updating a user



// 2fa
//router.post('/v1/users/me/2fa-token', users.twofaToken) // Configuring 2fa Token

//router.get('/v1/users/me/2fa-token', users.copytwofaToken) // Generating 2fa Token copy


//IPN

router.post('/v1/ipn', ipn.ipn)

router.get('/v1/ipn', function (req, res, next) {
  return res.end(`IPN Online`);
});

module.exports = router