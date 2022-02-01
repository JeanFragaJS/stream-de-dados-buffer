//Responsabilidade de subir o server

const customExpress = require('./config/customExpress');
const connection_Db = require('./infraestrutura/database/connectionDb');
const Tables = require('./infraestrutura/database/tables');

connection_Db.connect((erro)=>{
  if(erro){
    console.log(erro)
  }else{
    
    console.log('database conectado com sucesso :)');
    Tables.init(connection_Db);
    const app= customExpress();
    app.listen(3000,()=> console.log("servidor rodando na porta 3000"));
  }
})




