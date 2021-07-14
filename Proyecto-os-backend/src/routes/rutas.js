const express = require("express");
const router = express.Router();



router.get('/', (req,res) =>{
  res.send('login funcionando')
})

module.exports = router