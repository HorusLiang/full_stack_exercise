describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3004/api/testing/reset')
    const user={
      username:'liang',
      password:'123456'
    }
    cy.request('POST', 'http://localhost:3004/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('log in to')
  })

  it('login form is shown ', function() {
    cy.get('#username')
    cy.get('#password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('liang')
      cy.get('#password').type('123456')
      cy.contains('login').click()  
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('liang')
      cy.get('#password').type('12345657')
      cy.contains('login').click()
      cy.contains("Wrong username or password").should("have.css", "background-color", "rgb(255, 0, 0)")  
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('liang')
      cy.get('#password').type('123456')
      cy.get('button').then( buttons => {
        console.log('number of buttons', buttons.length)
        cy.wrap(buttons[0]).click()
      })
    })
    // it.only('then example', function() {
    //   cy.contains("logged in")
    //   cy.get('button').then( buttons => {
    //     console.log('number of buttons', buttons.length)
    //     cy.wrap(buttons[0]).click()
    //   })
    // })

    it.only('A blog can be created', function() {
      cy.contains("logged in")
      cy.contains('create new blog').click()
      cy.get('.title').type('my blog one')
      cy.get('.author').type('this is me:liang')
      cy.get('.url').type('www.baidu.com')
      cy.contains("create")
      cy.get('#create').then(($create) => {
        cy.wrap($create).click()
      })
      cy.contains('my blog one')
      
    })
    it.only('A blog can be liked', function() {
        cy.contains("logged in")
        cy.contains('create new blog').click()
        cy.get('.title').type('my blog one')
        cy.get('.author').type('this is me:liang')
        cy.get('.url').type('www.baidu.com')
        cy.contains("create")
        cy.get('#create').then(($create) => {
          cy.wrap($create).click()
        })
        cy.visit('http://localhost:3000').then(()=>{
          cy.wait(1000)
        })
        cy.visit('http://localhost:3000').then(()=>{
          cy.wait(1000)
        })
        cy.get('#view').should('be.visible').contains('view').then(($view) => {
            cy.wait(1000)
            $view.click()
          })
        cy.get('#likes').should('have.text', 'likes: 0')
        cy.get('#like').click()
        cy.get('#likes').should('have.text', 'likes: 1') 
      })
      

    })
  })
// update 5.20 