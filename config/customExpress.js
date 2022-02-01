//Responsabilidade de configurar o express

const express = require('express');
const consign = require('consign');
//const bodyParser = require('body-parser');


module.exports = ()=>{
  const app = express();
  
  app.use(express.json());//a aplicaçao consegue receber e pegar dados em json
  app.use(express.urlencoded({extended: true }))// e consegue receber e pegar dados em urlecoded
  consign().include('controllers').into(app)// inclui todos os modulos de controllers no app

  return app;
}