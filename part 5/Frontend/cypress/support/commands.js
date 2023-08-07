
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3004/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    console.log(window.localStorage)
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlogPost', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3004/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
  //console.log(window.localStorage);
  cy.visit('http://localhost:3000')
})