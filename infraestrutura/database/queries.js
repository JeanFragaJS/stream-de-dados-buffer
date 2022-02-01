const connectionDb = require('./connectionDb')

const execQuery =(query, parametros= '')=>{
  return new Promise((resolve, reject)=>{
    connectionDb.query(query, parametros, (erros, resultados)=>{
      if(erros){
        reject(erros)
      }else{
        resolve(resultados)
      }
    })
  })
}
module.exports= execQuery;