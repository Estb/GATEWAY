const { verify } = require(`coinpayments-ipn`);
const CoinpaymentsIPNError = require(`coinpayments-ipn/lib/error`);

const {
  MERCHANT_ID = 'id',
  IPN_SECRET = 'secret',
  PORT
} = process.env;

exports.ipn = (req, res, next) =>{

  if(!req.get(`HMAC`) || !req.body || !req.body.ipn_mode || req.body.ipn_mode !== `hmac` || MERCHANT_ID !== req.body.merchant) {
    console.log("erro")
    return next(new Error(`Invalid request`));
  }

  let isValid, error;

  try {
    isValid = verify(req.get(`HMAC`), IPN_SECRET, req.body);
  } catch (e) {
    error = e;
  }
  
  if (error && error instanceof CoinpaymentsIPNError) {
    return next(error);

  } else {

    if (!isValid) {
      return next(new Error(`Hmac calculation does not match`));
    } else {
      
      res.locals.status = req.body.status
      res.locals.statustext = req.body.status_text
      res.locals.txn_id = req.body.txn_id

      res.end()
      return next();
    }
  }
}