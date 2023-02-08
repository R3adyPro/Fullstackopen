describe('blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi',
      username: 'testi',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  
  it('login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('login', function() {
    it('login was succesful', function() {
      cy.get('#username').type('Testi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('testi is logged in')
    })

    it('login failed', function() {
      cy.get('#username').type('Testi')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('when login', function() {
    beforeEach(function() { 
      cy.login({ username: 'Testi', password: 'salainen'})
    })

    it('blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Testi')
      cy.get('#author').type('Author')
      cy.get('#url').type('www.testi.com')
      cy.get('#create-button').click()

      cy.contains('new blog Testi creation was succesful')
    })

    it('blog can be liked', function() {
      cy.contains('like').click()
      cy.contains('blog liked')
    })

    it('blog can be deleted', function() {
      cy.contains('delete').click()
      cy.on('window:confirm', () => true)
    })

    describe('blogs are sorted', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'first testi',
          author: 'testi',
          url: 'www.testi.com'
        })
        cy.createBlog({
          title: 'second testi',
          author: 'testi',
          url: 'www.testi.com'
        })
        cy.createBlog({
          title: 'third testi',
          author: 'testi',
          url: 'www.testi.com'
        })
      })
      it('blogs sorted', function() {
        cy.contains('first testi').parent().find('button').click()
        cy.get('#like-button').click()

        cy.contains('second testi').parent().find('button').click()
        cy.get('#like-button').click().wait(1000).click().wait(1000).click()

        cy.contains('third testi').parent().find('button').click()
        cy.get('#like-button').click().wait(1000).click()

        cy.get('.blog').eq(0).should('contain', 'second testi')
        cy.get('.blog').eq(1).should('contain', 'third testi')
        cy.get('.blog').eq(2).should('contain', 'first testi')
      })
    })
  })
})