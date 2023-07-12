const API_URL = Cypress.env('API_URL')

describe('API Plugin Test', {env: { hideCredentials: true} }, () => {
  
  it('Cadastrar um novo usuário', () => {
    cy.api({
      method:'POST',
      url: `${API_URL}/v2/usuarios`,
      body:{
        "usuarioNome": Cypress.env('API_USER_NAME'),
        "usuarioLogin": Cypress.env('API_NEW_USER'),
        "usuarioSenha": Cypress.env('API_PASSWORD')
      }
    })
    .should(({status, body}) => {
      expect(status).to.equal(201)
      expect(body.message).to.equal('Usuário adicionado com sucesso')
    })
  })

  it('Obter token do usuário', () => {
    cy.api({
      method:'POST',
      url: `${API_URL}/v2/login`,
      body:{
        "usuarioLogin": Cypress.env('API_NEW_USER'),
        "usuarioSenha": Cypress.env('API_PASSWORD')
      }      
    })
    .should(({status, body}) => {
      expect(status).to.equal(200)
      expect(body.message).to.equal('Sucesso ao realizar o login')
    })
  })

  it('Adicionar um novo produto ', () => {
    cy.api({
      method:'POST',
      headers: {
        token: Cypress.env('API_TOKEN_2')
      },
      url: `${API_URL}/v2/produtos`,
      body:{
        "produtoNome": "Carteira Bolovo",
        "produtoValor": "90.00",
        "produtoCores": [
          "Azul", "Rosa"
        ],
        "produtoUrlMock": "",
        "componentes": []
      },
    })
    .should(({status, body}) => {
      console.log(body)
      expect(status).to.equal(201)
      expect(body.message).to.equal('Produto adicionado com sucesso')
    })
  })

  it('Buscar um produto do usuario', () => {
    cy.api({
      method:'GET',
      headers: {
        token: Cypress.env('API_TOKEN_2')
      },
      url: `${API_URL}/v2/produtos/215993`
    })
    .should(({status, body}) => {
      console.log(body)
      expect(status).to.equal(200)
      expect(body.message).to.equal('Detalhando dados do produto')
      expect(body.data.produtoId).to.eq(215993)
    })
  })


})