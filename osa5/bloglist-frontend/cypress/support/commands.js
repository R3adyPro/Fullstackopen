Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username,
      password,
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body));
      console.log(localStorage.getItem('loggedNoteappUser'))
      cy.visit('http://localhost:3000');
    });
  });

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: "http://localhost:3003/api/blogs",
        method: 'POST',
        body: { title, author, url },
        headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('loggedNoteappUser')).token
            }`,
        }
    })

    cy.visit('http://localhost:3000')
})