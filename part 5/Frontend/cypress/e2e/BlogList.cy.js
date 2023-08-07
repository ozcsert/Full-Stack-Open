describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3004/api/testing/reset')
    const user = {
      name: 'Garip Kont',
      username: 'Doggo Barkinson',
      password: 'Bark'
    }
    cy.request('POST', 'http://localhost:3004/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('Doggo Barkinson')
      cy.get('#password')
        .type('Bark')
      cy.get('#login-button')
        .click()
      cy.contains('Logged in as Garip Kont')
    })

    it('login fails with wrong password', function() {
      cy.get('#username')
        .type('Doggo Barkinson')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()

      cy.get('html').should('not.contain', 'Garip Kont logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('Doggo Barkinson')
      cy.get('#password')
        .type('Bark')
      cy.get('#login-button')
        .click()
    })

    it('a new blog can be created', function() {

      cy.get('#title')
        .type('Test2')
      cy.get('#author')
        .type('Test2')
      cy.get('#url')
        .type('http://test2.html')
      cy.contains('Save')
        .click()

      cy.contains('Test2')

    })
    it('user can like a blog', function() {
      cy.get('#title')
        .type('Test3')
      cy.get('#author')
        .type('Test3')
      cy.get('#url')
        .type('http://Test3.html')
      cy.contains('Save')
        .click()

      cy.contains('Test3')
        .click()
      cy.contains('view')
        .click()
      cy.contains('0')
      cy.get('#like-button')
        .click()
      cy.contains('1')
    })

    it('user who created a blog can delete it', function() {
      cy.get('#title')
        .type('test4')
      cy.get('#author')
        .type('test4')
      cy.get('#url')
        .type('http://test4.html')
      cy.contains('Save')
        .click()

      cy.contains('test4')
        .click()
      cy.contains('view')
        .click()
      cy.get('#remove')
        .click()

      cy.get('html').should('not.contain', 'test4')
    })
  })

  describe.only('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'Doggo Barkinson', password:'Bark' })

      cy.createBlogPost({ author: 'Doggo', title: 'test1', url: 'http://example.com./test1' })
      cy.createBlogPost({ author: 'El Gato', title: 'test2', url: 'http://example.com./test2' })
      cy.createBlogPost({ author: 'Todd The Toad', title: 'test3', url: 'http://example.com./test3' })

      cy.get('#username')
        .type('Doggo Barkinson')
      cy.get('#password')
        .type('Bark')
      cy.get('#login-button')
        .click()

      cy.contains('test1').parent().parent().parent().as('blog1')
      cy.contains('test2').parent().parent().parent().as('blog2')
      cy.contains('test3').parent().parent().parent().as('blog3')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})