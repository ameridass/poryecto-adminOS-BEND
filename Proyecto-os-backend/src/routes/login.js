const express = require("express");
//const connection = require("express-myconnection");
const router = express.Router();
const conn = require("mysql");
const bcryptjs = require('bcryptjs')

router.get("/consulta", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM tn1.users", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

router.post("/", async (req, res) => {
  const user = req.body.user;
  const password = req.body.pass;
  let passwordHash = await bcryptjs.hash(password, 8);
  if (user && password) {
    req.getConnection((err, conn) => {
      if (err) {
        return res.send(err);
      } else {
        conn.query(
          "SELECT * FROM tn1.users WHERE username = ?",[user],async (err, rows) => {
            if (err) {
              return res.send(err);
            } else {
              if (rows.length == 0 || !(await bcryptjs.compare(password, rows[0].pass))) {
                return res.send("Usuario o contrasena no validos");
                //res.send(rows)
              } else {
                return res.send("logged in");
              }
            }
          }
        );
      }
    });
  }
});

module.exports = router;