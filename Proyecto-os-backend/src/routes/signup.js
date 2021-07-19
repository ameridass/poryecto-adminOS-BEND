const express = require("express");
const router = express.Router();
const bcryptjs = require('bcryptjs');



router.get('/', (req, res) => {
    res.send('signup funcionando')
})

router.post('/', async (req, res) => {
    const nombre1 = req.body.nombre1;
    const nombre2 =  req.body.nombre2;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const username = req.body.username;
    const password =  req.body.pass;
    const email = req.body.email;
    const fechaCreacion = req.body.efechac;
    const fechaModificacion =  req.body.fechamod;

    let passwordHash = await bcryptjs.hash(password, 8 );

    req.getConnection((err, conn) => {
        if (err) return res.send(err)    
        //console.log(req.body);
        conn.query('INSERT INTO tn1.users SET ?', {nombre1:nombre1, nombre2:nombre2, apellido1:apellido1, apellido2:apellido2, username:username, pass:passwordHash, email:email, efechac:fechaCreacion, fechamod:fechaModificacion}, async (err, rows)=>{
            if(err){
                return res.send(err)
            }else{
                return res.send('Usuiario registrado')
                
            }
            
            
        })   
    })
})

module.exports = router