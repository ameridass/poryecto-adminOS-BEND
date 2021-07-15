const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.send('login funcionando')
})

router.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body);
    })
})

module.exports = router