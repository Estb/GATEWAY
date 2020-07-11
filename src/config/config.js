module.exports = {
   development: {
       database:{
           host: process.env.DATABASE_HOST,
           port: 3306,
           name: 'gateway',
           dialect:'mysql',
           user: 'root',
           password: ''
       }
   },
   production:{
       database:{
        host:process.env.BD_HOST,
        port:process.env.DB_PORT

        } 
    }
};