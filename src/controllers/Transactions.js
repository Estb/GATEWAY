const crypto = require('crypto')
const Coinpayments = require("coinpayments")
const auth = require('../config/auth')
const client = new Coinpayments(auth)

const transactionsModels = require('../models/Transactions')
const merchantModels = require('../models/Merchants')
const controller = require('./index')


exports.updateTx = (req, res, next) => {
 
  const status = res.locals.status
  const txn_id = res.locals.txn_id

  if (status){

    if(status==0){
      var statustext = "Waiting for buyer funds..."
    } else if(status == -1) {
      var statustext = "Cancelled / Timed Out"
    }else if(status == -2) {
      var statustext = "Refund or Reversal"
    }else if (status == 1){
      var statustext = " We have confirmed coin reception from the buyer"
    } else if (status == 100){
      var statustext = "Complete"
    }else {
      var statustext = "Unknown"
    }

  transactionsModels.findOne({txn_id, where: {txn_id:txn_id}})
    .then(tx => {
      if(tx) {
        transactionsModels.update(
              {
                status : status,
                statustext:statustext
              },
              {where: {txn_id:txn_id}}
            )
            .then( () => { 
              console.log("atualiza IPN cliente")
            })
            .catch (error => next (error))
      } else {
        console.log('Transaction not found');
      }
    })
    .catch (error => next (error))

} else {
  console.log(status)
  }
}


exports.createTx = (req, res, next ) => {

  const amount1 = req.body.amount
  const currency1 = req.body.currency1
  const currency2 = req.body.currency2
  const buyer_email = "estevaoaugusto@hotmail.com"
  const buyer_name = "BZLGateway"
  const item_name = "BZLGateway"
  const item_number = 123456 // must be a unique nuber transacttion from bzlgateway
  const custom = "BZLGateway"
  const invoice = "BZLGateway"
  const ipn_url = "http://167.86.90.70:3002/api/v1/ipn"

 if (amount1 >0 & currency1 != undefined & currency2 != undefined) {
   
  options = {
    currency1:currency1,
    currency2: currency2,
    amount:amount1,
    buyer_email:buyer_email,
    buyer_name:buyer_name,
    item_name:item_name,
    item_number:item_number,
    invoice:invoice,
    custom:custom,
    ipn_url:ipn_url
  }
    client.createTransaction(options)
    .then((transaction)=>{
      const trx = {
        amount2 : transaction.amount,
        txn_id : transaction.txn_id,
        address : transaction.address,
        confirms_needed : transaction.confirms_needed,
        timeout : transaction.timeout,
        buyer_email: req.body.buyer_email,
        buyer_name : req.body.buyer_name,
        item_name : req.body.item_name,
        item_number : req.body.item_number,
      }

      const pubkey = req.body.pubkey
      const address = trx.address
      const confirms_needed = trx.confirms_needed
      const timeout = trx.timeout
      const txnid = makeid(20)
      const amount2 = trx.amount2

  
      if(transaction) {
        merchantModels.findOne({where: {pubkey:pubkey}})
        .then(merchants => {
          if(merchants) {
            const merchantId = merchants.merchantId
      
            transactionsModels.create({
              txnid  : txnid,
              txn_id  : trx.txn_id,
              address : trx.address,
              amount1 : amount1,
              amount2 : trx.amount2,
              currency1 : currency1,
              currency2 : currency2,
              item_name : trx.item_name,
              item_number : trx.item_number,
              custom : trx.custom,
              invoice : trx.invoice,
              buyer_email : trx.buyer_email,
              buyer_name : trx.buyer_name,
              confirms_needed : trx.confirms_needed,
              timeout : trx.timeout,
              merchantId : merchantId
            })
          .then( () => {
                res.status(201).send({txn_id:txnid, address:address, amount:amount2, confirms_needed:confirms_needed, timeout:timeout , statusCode: 201});        
              })
          .catch((error) => next(error))
                } else {
                  res.status(500).send({sucess: false, message: 'id not match' , statusCode: 500})
                }
              })
        .catch((error) => next(error))
          } else {
            res.status(500).send({sucess: false, message: 'error, update and try again' , statusCode: 500})
        }
  
    })
    .catch((error) => next(error))


  } else {
    res.status(500).send({sucess: false, message: 'Amount, currency1 y currency2 they are required and cannot be empty' , statusCode: 500})
  }
}


exports.statusTx = (req, res, next) => {

  const txnid = req.body.txn_id
  const merchantId = req.param.merchantId

  transactionsModels.findOne({txnid, where: {txnid:txnid, merchantId:merchantId}})
  .then((transaction)=> {
    if(transaction){

      var status = transaction.status
      
      if(status==0){
        var statustext = "Waiting for buyer funds..."
      } else if(status == -1) {
        var statustext = "Cancelled / Timed Out"
      }else if(status == -2) {
        var statustext = "Refund or Reversal"
      }else if (status == 1){
        var statustext = " We have confirmed coin reception from the buyer"
      } else if (status == 100){
        var statustext = "Complete"
      }else {
        var statustext = "Unknown"
      }

    var  tx= {}

     tx[transaction.txnid] = {
        time_created:transaction.createdAt,
        status:transaction.status,
        status_text:statustext, 
        coin:transaction.currency2,
        amount:transaction.amount2,
        payment_address:transaction.address,
        received:transaction.received

      }

      res.status(200).send({tx})
    } else {
      res.status(404).send({sucess: false, message: 'Transaction not found' , statusCode: 404})
    }
  })
  .catch(error => next(error))
}

exports.listallTx = (req, res, next) => {

  const merchantId = req.param.merchantId

  var tx = {}

  transactionsModels.findAll({merchantId, where: {merchantId:merchantId}})
  .then((transactions)=> {
    if(transactions){

      for (let i = 0; i < transactions.length; i++){

        var status = transactions[i].status
      
        if(status==0){
          var statustext = "Waiting for buyer funds..."
        } else if(status == -1) {
          var statustext = "Cancelled / Timed Out"
        }else if(status == -2) {
          var statustext = "Refund or Reversal"
        }else if (status == 1){
          var statustext = " We have confirmed coin reception from the buyer"
        } else if (status == 100){
          var statustext = "Complete"
        }else {
          var statustext = "Unknown"
        }


        tx[i] = {
          txn_id : transactions[i].txnid,
          time_created:transactions[i].createdAt,
          status:transactions[i].status,
          status_text:statustext, 
          coin:transactions[i].currency2,
          amount:transactions[i].amount2,
          payment_address:transactions[i].address,
          received:transactions[i].received
  
        }
        
    }

    res.status(200).send({tx})
    } else {
      res.status(404).send({sucess: false, message: 'Transaction not found' , statusCode: 404})
    }
  })
  .catch(error => next(error))
}


exports.hmac = (req, res, next) =>{

  const pubkey = req.body.pubkey
  const privkey = req.params.privkey


  if (pubkey && privkey){
      const hmac = crypto.createHmac('sha512', privkey)
      const result = JSON.stringify(req.body)
      hmac.update(result)
      const signature = hmac.digest('hex')

      if(signature) {
        return res.status(200).send({ hex:signature })
      } else {
      next()
      }
    } else {
      res.status(401).send({ auth: false, message: 'falta pub ou priv.' })
    }
}