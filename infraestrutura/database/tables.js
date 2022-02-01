class Tables{
  init(conexao){
    this.conexao = conexao; // o this vai passar a conexão pro escopo (global ou da class ?)
    this.createAtendimento();
    this.createPets();

  }

  createAtendimento(){
    const sql = `CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT,
       cliente varchar(12) NOT NULL, 
       pet varchar(20), 
       servico varchar(20) NOT NULL, 
       data datetime NOT NULL,
       dataCriacao datetime NOT NULL,
       status varchar(20) NOT NULL, 
       observacoes text, 
       PRIMARY KEY(id))`;

    this.conexao.query(sql, erro =>{
      if(erro){
        console.log(erro);
      }else{
        console.log('Tabela atendimento criada com sucesso');
      }
    });
  }

  createPets(){
    const sql= `CREATE TABLE IF NOT EXISTS pets(id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    image varchar(200) NOT NULL,
    PRIMARY KEY(id))
    `
    this.conexao.query(sql, erro=>{
      if(erro){
        console.log(erro)
      }else{
        console.log('Table pets criada com sucesso')
      }
    })
  }
}

module.exports = new Tables;