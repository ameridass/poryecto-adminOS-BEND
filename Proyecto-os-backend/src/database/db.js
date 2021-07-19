const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    insecureAuth: true
})

conexion.connect((error)=>{
    if(error){
         console.log(error)
         return;
    }
    console.log('Conexion establecida')
})

module.exports = conexion;