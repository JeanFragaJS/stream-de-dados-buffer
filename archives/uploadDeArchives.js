const fs = require('fs')
const path = require('path')

/*
fs.readFile('./assets/ivi.jpg', (erro, buffer)=>{
  console.log('imagem buferizada')
  fs.writeFile('./assets/ivi-copy.jpg',buffer, (erro)=>{
    console.log('imagem foi escrita')
  })

})
*/
module.exports=(pathArchive, fileName, callbackCreatedImage)=>{

  const acceptTypes= ['jpg', 'jpeg', 'png'] //tipos aceitos
  const type =path.extname(pathArchive)// adiciona a extensao no final do nome do arquivo
  const validationTypes= acceptTypes.indexOf(type.substring(1)) !== -1 
  // pega no array a posicao em que a extensão seja a mesma do pathArchive 

  if(validationTypes){
    const newPath= `./assets/images/${fileName}${type}` 

    fs.createReadStream(pathArchive)
      .pipe(fs.createWriteStream(newPath))
      .on('finish',()=>{
          callbackCreatedImage(false, newPath)  
    } )

  }else{
    const erro ='Tipagem invalida'
    console.log('Erro, tipagem inválida')
    callbackCreatedImage(erro)
  }
}