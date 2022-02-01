const connection_Db = require('../infraestrutura/database/connectionDb.js')
const uploadArchives = require('../archives/uploadDeArchives.js')


class Pet{
  create_pet(pet, res){
    const sql= `INSERT INTO pets SET?`

    uploadArchives(pet.image, pet.name, (erro, newPath)=>{
      if(erro){
          res.status(400).json(erro)
      }else{
          const newPet= {
          name:pet.name,
          image:newPath
        }

        connection_Db.query(sql, newPet, (erro)=>{
          if(erro){
            res.status(400).json(erro)
          }else{
            res.status(200).json(newPet)
          }
       })
      }
    }) 
  }
}

module.exports= new Pet;