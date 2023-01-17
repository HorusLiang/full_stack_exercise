describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('log in to')
  })

  it('login form is shown and can be logged', function() {
    cy.get('#username').type('liang')
    cy.get('#password').type('123456')
    cy.contains('login').click()  
  })
})