const query= require('../infraestrutura/database/queries')

class repositoryAtendimento{
  addAtendimento(atendimento){
    const sql = `INSERT INTO atendimentos SET ?`

    return query(sql,atendimento)
  }

  getAtendimentos(){
    const sql= `SELECT * FROM atendimentos`
    return query(sql)
  }

  getOneAtendimento(id){
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`

    return query(sql)
  }

  updateAtendimento(valuesAtendimento, id ){
    const sql= `UPDATE atendimentos SET ? WHERE id=?`
    return query(sql, [valuesAtendimento,id])
  }

  deleteAtendimento(id){
    const sql= `DELETE FROM atendimentos WHERE id=?`
    return query(sql, id)
  }

}



module.exports = new  repositoryAtendimento()