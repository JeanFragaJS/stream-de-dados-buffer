const Pet= require('../models/Pet.js')

module.exports = app=>{
  app.post('/create-pet', (req,res)=>{
    const pet= req.body
    Pet.create_pet(pet, res);

  })
}