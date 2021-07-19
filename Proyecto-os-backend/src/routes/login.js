const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT * FROM tn1.users',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

module.exports = router;