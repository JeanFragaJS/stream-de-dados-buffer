const moment = require('moment');
const axios= require('axios');
const repositoryAtendimento= require('../repository/repositoryAtendimento')
//const atendimento = require('../controllers/controllersAtendimento');
const connection_Db = require('../infraestrutura/database/connectionDb');
const { updateAtendimento } = require('../repository/repositoryAtendimento');

class Atendimento{
    

      constructor(){
        this.dataValida = ({data, dataCriacao})=>{moment(data).isSameOrAfter(dataCriacao)}
        this.clienteValido = (tamanho)=>tamanho = 11
        this.valida = (parametros)=>this.validaçoes.filter(campo=>{
          const {nome}= campo
          const parametro = parametros[nome]

          return !campo.criterio(parametro)
        })
        this.validaçoes = [
          {
            nome: "data",
            criterio: this.dataValida,
            message: "Por gentileza, indique uma data válida"
          },
          {
            nome:"cliente",
            criterio:this.clienteValido,
            message:"indique um nome válido"
          }
         ]
      }

    create_atendimento(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss'); //nome das var  sao as columns
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')//nome das var  sao as columns: ;
      
        const parametros = {
          data:{data, dataCriacao},
          cliente: {tamanho:atendimento.cliente.length}
        }

        const erros = this.valida(parametros)
        const existErros = erros.length
        
        if(existErros){
          return new Promise((resolve, reject)=>{
            reject(erros)
          })
        }else{
          const moment_criation_Atendimento= {...atendimento, dataCriacao, data} 
          return repositoryAtendimento.addAtendimento(moment_criation_Atendimento)
            .then(resultados=>{
              const id = resultados.insertId
              return ({...atendimento, id})
            })
          }
    };

    list_atendimentos(){
      return repositoryAtendimento.getAtendimentos()
    }

    get_atendimento(id){
      return repositoryAtendimento.getOneAtendimento(id)
        .then(async(resultado)=>{
            const atendimento = resultado[0]
            const cpf= atendimento.cliente
            const{data} = await axios.get(`http://localhost:8082/${cpf}`)
            atendimento.cliente= data
            return atendimento
        })
     /*const sql =`SELECT * FROM atendimentos WHERE id=${id}`

     connection_Db.query(sql,  async (erro, resultado)=>{
       const atendimento = resultado[0] //para nao vir um array, apenas retornar um objeto do array.
       const cpf = atendimento.cliente 


       if(erro){
         res.status(400).json(erro)
       }
        const{data} = await axios.get(`http://localhost:8082/${cpf}`)

        atendimento.cliente= data

        res.status(200).json(atendimento)
     })
     */
    }

    edit_atendimento(id, valuesAtendimento){

        if(valuesAtendimento.data){
          valuesAtendimento.data= moment(valuesAtendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
          return repositoryAtendimento.updateAtendimento(valuesAtendimento,id)
        /*
        const sql = `UPDATE atendimentos SET ? WHERE id=?`

        connection_Db.query(sql, [valuesAtendimento, id], (erro, resultado)=>{
          if(erro){
            res.status(400).json(erro)
          }else{
            res.status(200).json({...valuesAtendimento, id})
          }
        })
        */
    }

    delete_atendimento(id){
     return repositoryAtendimento.deleteAtendimento(id)
    }
  
}

module.exports = new Atendimento; 