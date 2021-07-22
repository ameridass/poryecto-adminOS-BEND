const express = require("express");
//const connection = require("express-myconnection");
const router = express.Router();
const conn = require("mysql");
const bcryptjs = require("bcryptjs");
global.XMLHttpRequest = require("xhr2");
var xhr = new XMLHttpRequest();
//var cors = require('cors');

router.get("/consulta", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM tn1.users", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

xhr.onload = function () {
  // Procesamos y validamos la respuesta del servidor: 200 OK o 300 redirect lo cual es una respuesta desde el servidor a nuestra consulta
  if (xhr.status >= 200 && xhr.status < 300) {
    // que hacer con la respuesta del servidor
    console.log("Completado!");
  } else {
    // Que hace cuando la respeusta falle
    console.log("Ooops. ha ocurrido un error!");
  }
};
xhr.open("GET", "https://dog.ceo/api/breeds/list/all");
xhr.send();

/*const corsOptions ={
  origin:"http://localhost",
  optionsSuccessStatus:200
}*/

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
          "SELECT * FROM tn1.users WHERE username = ?",
          [user],
          async (err, rows) => {
            if (err) {
              return res.send(err);
            } else {
              if (
                rows.length == 0 ||
                !(await bcryptjs.compare(password, rows[0].pass))
              ) {
                return res.send("Usuario o contrasena no validos");
                //res.send(rows)
              } else {
                const response = xhr.response;
                return res.send(response);
              }
            }
          }
        );
      }
    });
  }
});

module.exports = router;
