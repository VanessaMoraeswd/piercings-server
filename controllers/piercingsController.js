function getPiercings(req, res) {
  //Estes dados abaixo simulam o banco de dados
  const piercings = [
    {
      id: 1,
      name: 'piercing A',
      price: 50.0
    },
    {
      id: 2,
      name: 'piercing B',
      price: 30.0
    }
  ]
  //Abaixo definimos o status de sucesso e enviamos a lista de piercings como JSON
  res.statusCode = 200
  res.end(JSON.stringify(piercings))
}

function createPiercing(req, res) {
  let body = ''

  //Recebe os dados do corpo da requisição em partes (chunks)
  req.on('data', chunk => {
    body += chunk.toString()
  })

  //Processa os dados após a recepção completa
  req.on('end', () => {
    try {
      const newPiercing = JSON.parse(body) // Converte o corpo da requisição de JSON para um objeto
      newPiercing.id = Date.now() // Gera um ID único (em uma aplicação real, o banco de dados geraria o ID)

      // Define o status de criação e envia o produto criado como resposta
      res.statusCode = 201
      res.end(
        JSON.stringify({
          message: 'piercing sucessfully created',
          piercing: newPiercing
        })
      )
    } catch (error) {
      // Lida com erros de parsing JSON
      res.statusCode = 400
      res.end(JSON.stringify({ message: 'Error processing piercing' }))
    }
  })
}

// Controlador para atualizar um produto
function updatePiercing(req, res) {
  const id = req.url.split('/')[3] // Extrai o ID da URL
  let body = ''

  // Recebe os dados do corpo da requisição em partes (chunks)
  req.on('data', chunk => {
    body += chunk.toString()
  })

  // Processa os dados após a recepção completa

  req.on('end', () => {
    try {
      const updatePiercing = JSON.parse(body) // Converte o corpo da requisição de JSON para um objeto
      updatePiercing.id = parseInt(id, 10) // Garante que o ID seja um número inteiro

      // Define o status de sucesso e envia o produto atualizado como resposta
      res.statusCode = 200
      res.end(
        JSON.stringify({
          message: 'piercing sucessfully updated',
          piercing: updatePiercing
        })
      )
    } catch (error) {
      // Lida com erros de parsing JSON
      res.statusCode = 400
      res.end(JSON.stringify({ message: 'Error processing the piercing' }))
    }
  })
}

// Controlador para deletar um produto
function deletePiercing(req, res) {
  const id = req.url.split('/')[3] // Extrai o ID da URL
  // Define o status de sucesso e envia uma mensagem confirmando a exclusão
  res.statusCode = 200
  res.end(
    JSON.stringify({ message: `piercing with ID ${id} sucessfully deleted` })
  )
}
// Exporta os controladores para serem usados em outros módulos
module.exports = {
  getPiercings,
  createPiercing,
  updatePiercing,
  deletePiercing
}
