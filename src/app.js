const http = require("http");
const express = require('express')
const Routes = require("./routes/index.js");
const sequelize = require('./database/database').default.default
const bodyParser = require('body-parser');
require("dotenv-safe").config();

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', Routes)

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something is wrong :(');
});

app.set('port', process.env.PORT || 3002)

sequelize.sync({force: false})
.then(()=>{
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port' + app.get('port'))
  })
})