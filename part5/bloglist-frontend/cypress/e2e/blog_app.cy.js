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
})