//Controlar as rotas e dizer o que fazer quando e cada rota for acessada

const Atendimento = require('../models/modelsAtendimento');

module.exports = app => {
  app.get('/atendimentos', (req,res)=>(
    Atendimento.list_atendimentos()
    .then(resultados=>{
      res.status(200).json(resultados)
    })
    .catch(erros=>{res.status(400).json(erros)})
  ))

  app.get('/atendimentos/:id', (req, res)=>{
    const id = parseInt(req.params.id)

    Atendimento.get_atendimento(id)
    .then(resultados=>{
      res.status(200).json(resultados)
    })
    .catch(erros=>{
      res.status(400).json(erros)
    })
  })

  app.post('/create-atendimento', (req, res)=>{
    const atendimento = req.body;
    
    Atendimento.create_atendimento(atendimento)
    .then(atendimentoCadastrado=>{res.status(201).json(atendimentoCadastrado)
    })
    .catch((erros) =>{res.status(400).json(erros)
    })  
    
    //res.send("Você está enviando dados para a api. :)")
  })

  app.patch('/atendimentos/:id', (req,res)=>{
    const id= parseInt(req.params.id)
    const values= req.body

    Atendimento.edit_atendimento(id,values)
      .then((values, id)=>{
        res.status(200).json({...values, id})
      })
      .catch(erros=>{
        res.status(400).json(erros)
      })
  })

  app.delete('/atendimentos/:id', (req,res)=>{
    const id= parseInt(req.params.id)
    
    Atendimento.delete_atendimento(id)
      .then(resultados=>{
        res.status(200).json(resultados)
      })
  })
}

