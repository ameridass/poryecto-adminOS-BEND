const express = require('express');
const app = express();
const mySql = require('mysql')
const conn = require('express-myconnection')
const signup = require('./routes/signup')
const login = require('./routes/login')
const cors = require('cors')



//config server
app.set('port', process.env.PORT || 40000);

//conexion a bd

const dbOptions = {
    host: "174.138.41.43",
    port: 3370,
    user: 'nodejs1',
    password: '#Tn12021T',
    database: 'tn1',
    //multipleStatements:true
    insecureAuth: true
}




//gestion o middleware
app.use(conn(mySql, dbOptions, 'single'))
app.use(express.json())
/*app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:40000');
    res.setHeader('Access-Control-Allow-Methods','GET,POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})*/
//app.use(cors)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




//rutas
app.get('/', (req, res) => {
    res.send('Consumiendo')
})

app.use('/signup', signup)
app.use('/login', login)


//configuracion del server
app.listen(app.get('port'), () => {
    console.log('Escuchando en el puerto ' + app.get('port') + ' correctamente')
});
