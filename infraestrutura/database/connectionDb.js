const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port:3306,
  user:'root',
  password:'familia35',
  database:'agenda-petshop'
})

module.exports =connection;