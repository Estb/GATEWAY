const Sequelize = require('sequelize')
const database = require('../database/database')
const Transactions = require('./Transactions')

const Merchants = database.define('merchants', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  merchantId: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING(15)
  },
  rs:{
    allowNull: true,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  fantasia: {
    allowNull: true,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  responsavel: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  cpfcnpj: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [9, 255]
    }
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [8, 255],
     //   isAlphanumeric:true
    }
  },
  email:{
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      isEmail: {
        args: true,
        msg: "Must be a valid email"
      }
    }
  },
  verified:{
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue:0
  },
  verified_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  },
  role:{
    allowNull: false,
    type: Sequelize.STRING(20),
    defaultValue:'user'
  },
  active:{
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue:1
  },
  idreferral:{
    allowNull: false,
    type: Sequelize.STRING(20),
  },
  referenciado:{
    allowNull: false,
    type: Sequelize.STRING(20),
    defaultValue: '0'
  },
  merchantKey:{
    allowNull: true,
    type: Sequelize.STRING(50),
  },
  pubkey:{
    allowNull: false,
    type: Sequelize.STRING(60),
  },
  privkey:{
    allowNull: false,
    type: Sequelize.STRING(60),
  },
  newKey_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  },
  resetpass_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  },
  deleted_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  }
}, {underscored: true})

Merchants.hasMany(Transactions, { foreignKey: 'merchantId' }); // Will add userId to Task model
Transactions.belongsTo(Merchants); // Will also add userId to Task model

module.exports = Merchants
