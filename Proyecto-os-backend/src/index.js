const express = require('express');
const app = express();
const mySql =  require('mysql')
const conn =  require('express-myconnection')
const routes = require('./routes/rutas')


//config 
app.set('port', process.env.PORT || 8080);
const dbOptions = {
    host:"174.138.41.43",
    port: 3306,
    user:'root',
    password:'#Tn12021T',
    database:'tn1',
    //multipleStatements:true
    insecureAuth : true
}

//gestion o middleware
//app.use(conn(mySql, dbOptions, 'single'))

//rutas
app.get('/',(req, res) =>{
    res.send('Consumiendo')
})

app.use('/login', routes)


//configuracion del server
app.listen(app.get('port'), () => {
console.log('Escuchando en el puerto '+ app.get('port') +' correctamente')
});