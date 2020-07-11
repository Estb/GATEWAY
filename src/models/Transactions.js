const Sequelize = require('sequelize')
const database = require('../database/database')

const Transactions = database.define('transactions', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  merchantId: {
    allowNull: false,
    type: Sequelize.STRING(15)
  },
  txn_id:{
    allowNull: false,
    type: Sequelize.STRING(255)
  },
  address: {
    allowNull: false,
    type: Sequelize.STRING(40)
  },
  amount1: {
    allowNull: false,
    type: Sequelize.STRING
  },
  amount2: {
    allowNull: false,
    type: Sequelize.STRING
  },
  currency1:{
    allowNull: false,
    type: Sequelize.STRING
  },
  currency2:{
    allowNull: false,
    type:Sequelize.STRING
  },
  received:{
    allowNull: true,
    type:Sequelize.INTEGER,
    defaultValue: '0'
  },
  status:{
    allowNull: false,
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  statustext:{
    allowNull: true,
    type: Sequelize.STRING
  },
  confirms_needed:{
    allowNull: false,
    type: Sequelize.INTEGER
  },
  timeout:{
    allowNull: false,
    type: Sequelize.INTEGER
  },
  item_name:{
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  item_number:{
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  custom:{
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  invoice:{
    allowNull: true,
    type: Sequelize.STRING(40)
  }
})

module.exports = Transactions