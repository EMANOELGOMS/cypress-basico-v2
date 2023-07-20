
// Veja as funcionalidades do type() e do click(), na documentação
// variavel encadeada
describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
      cy.visit('./src/index.html')
      //cy.visit('')
      
  });

  it('verificar o título da aplicação', () => {
      
      
      //verificação se o titulo esta correto
      cy.title().should('be.eq','Central de Atendimento ao Cliente TAT')
      
  });

  //contem todo o passo, porem foram colocados em atalhos
  it.only('Preencher os campos obrigatórios e enviar o formulário', () => {
      //Mapear cada campo obrigatório
      const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
    
      //Nome
      cy.get('#firstName').type('Emanoel')
          .should('be.visible')
          .should('have.value','Emanoel')  //ter o valor emanoel       
      //Sobrenome
      cy.get('#lastName').type('Silva')        
      //email
      cy.get('#email').type('teste@teste.com')
      //Como posso ajudar?
      cy.get('#open-text-area').type(longText, {delay: 0}) // delay = 0 >> executa texto muito longo rápido 
      //Enviar
      //cy.get('button').contains('Enviar').click()
      //cy.get('.button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')// mostra que o teste esta passando
      
  });
  it('exibe mensagem de erro ao submeter formulário com um email com formatação invalida', () => {

      cy.get('#firstName').type('Emanoel')
      cy.get('#lastName').type('Silva') 
      cy.get('#email').type('teste@teste,com') // tentar com o email inválido
      cy.get('#open-text-area').type('teste')
      cy.get('.button[type="submit"]').click()

      cy.get('.error').should('be.visible') // a mensagem de error deve está visível
      
  });

  it('campo de telefone continua vazio quando preenchido com o valor não-numerico', () => {
      cy.get('#phone')
          .type('lcjsckldncnk')
          .should('have.value', '') // ter o valor vazio >> neste caso!!        
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas é preenchido antes do envio do formulário', () => {

      cy.get('#firstName').type('Emanoel')
      cy.get('#lastName').type('Silva') 
      cy.get('#email').type('teste@teste.com') 
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('teste')
      cy.get('.button[type="submit"]').click()
      // vendo se a mesnagem de error esta visivel
      cy.get('.error').should('be.visible') // 
      
      
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

      cy.get('#firstName')                    // busca classe ou ID
          .type('Emanoel')                    // Digitano campo
          .should('have.value','Emanoel')     // verifica se o nome corresponde a string desejada 
          .clear()                            // Limpa o campo que foi digitado
          .should('have.value', '')           // verifica se o campo foi limpo

      cy.get('#lastName')
          .type('Gomes')
          .should('have.value','Gomes')
          .clear()
          .should('have.value', '')

      cy.get('#email')
          .type('teste@teste.com')
          .should('have.value','teste@teste.com')
          .clear()
          .should('have.value', '')

      cy.get('#open-text-area')
          .type('teste')
          .should('have.value','teste')
          .clear()
          .should('have.value', '')
      
  });


  it('verificação de error quando os campos obrigatoria não são colocados', () => {

      cy.get('.button[type="submit"]').click()
      
      cy.get('.error')
          .should('be.visible')
      
  });
  it('enviar o formulário com sucesso usando um comando customizado', () => {

      cy.fillMandatoryFieldsAndSubmit()        
      cy.get('.success').should('be.visible')
  });

  it('Selecione um produto (YouTube) por seu texto', () => {
      cy.get('#product') //pega o produto
          .select('YouTube') //seleciona o produto            
          .should('have.value','youtube')
 
      
          
  });

  it('seleciona um produto (mentoria) pelo seu valor (value)', () => {
      cy.get('#product')
          .select('mentoria') /// selecionando o produto
          .should('have.value', 'mentoria')
  });

  it('Seleciona um produto (blog) pelo indice ', () => {
      cy.get('#product')
          .select(1)    // buscando peloo indice
          .should('have.value', 'blog')       
  });

  it('marca o tipo de atendimento (feedback)', () => {    
      cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value','feedback')//verificar se o valor é o que esta sendo buscado

      
  });
  it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
          .should('have.length',3) // verificar se tem os três
          .each(($radio)=>{ // encadeia para passar por cada item

              cy.wrap($radio).check() //em cada item da check
              cy.wrap($radio).should('be.checked') // verifica em cada item se foi dado check
          })
          
      
  });
  it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
          .check() //marca todos que encontrar com esse seletor
          .should('be.checked') //ver se esta marcado
          .last() // pegou o ultimo e selecionou
          .uncheck() // desmarcou o ultimo selionado
          .should('not.be.checked') //ver se estar desmarcado

  });

  it(' seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
          .should('not.have.value') //verifica se o campo esta vazio
          .selectFile('./cypress/fixtures/example.json')// selecionando o arquivo de outra pagina
          //busca com a função o elemento recebido (input)
          .should(($input)=> {
              //espera o 1° input e o 1° arquivo com o nome = a example.json
              expect($input[0].files[0].name).to.equal('example.json')
          })

  });
  
  it('seleciona um arquivo simulando um drag-and-drop', () => {
      //como se o usuário estivesse arastando o arquivo até o campo de adicionar anexo
      cy.get('#file-upload')
          .should('not.have.value') //verifica se o campo esta vazio
          .selectFile('./cypress/fixtures/example.json',{ action: 'drag-drop' } )// selecionando o arquivo de outra pagina
          //busca com a função o elemento recebido (input)
          .should(($input)=> {
              //espera o 1° input e o 1° arquivo com o nome = a example.json
              expect($input[0].files[0].name).to.equal('example.json')
          })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('nomeemanoel') //dando o nome ao arquivo
      cy.get('input[type="file"]') //pegou o pelo tipo
          .selectFile('@nomeemanoel')

  });
  it('Verifica que a politica de privacidade abre em outra aba sem a necessidade em um clique', () => {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
      
      
  });
  
  it('vamos começar', () => {
      
  });
   
});



