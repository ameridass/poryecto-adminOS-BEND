const express = require("express");
//const connection = require("express-myconnection");
const router = express.Router();
const conn = require("mysql");

/*router.get('/', (req, res) => {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT * FROM tn1.users',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})*/

router.post("/", (req, res) => {
  const user = req.body.user;
  const password = req.body.pass;
  req.getConnection((err, conn) => {
    if (err) {
      return res.send(err);
    } else {
      conn.query("SELECT * FROM tn1.users WHERE username = ?", [user], (err, rows) => {
        if (err) {
          return res.send(err);
        } else {
          if (rows.length == 0) {
            res.send("Usuario o contrasena no validos");
            //res.send(rows)
          } else {
            res.send("logged in");
          }
        }
      });
    }
  });
});

module.exports = router;
