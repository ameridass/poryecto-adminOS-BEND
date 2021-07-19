const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.send('signup funcionando')
})

router.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)    
        //console.log(req.body);
        conn.query('INSERT INTO tn1.users SET ?', [req.body],(err, rows)=>{
            if(err) return res.send(err)
            
            res.send('Usuiario registrado')
        })   
    })
})

module.exports = router