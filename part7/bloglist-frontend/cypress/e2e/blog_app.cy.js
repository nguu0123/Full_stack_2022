describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'user',
      username: 'nguu0123',
      password: 'nguu0123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginform')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('nguu0123')
      cy.get('#password').type('nguu0123456')
      cy.get('#login_button').click()
      cy.contains('nguu0123 logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('nguu0123')
      cy.get('#password').type('nguu012345')
      cy.get('#login_button').click()
      cy.contains('Wrong username or password')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('nguu0123')
      cy.get('#password').type('nguu0123456')
      cy.get('#login_button').click()
      cy.get('#new_blog_button').click()
      cy.get('#title_input').type('title_test1')
      cy.get('#author_input').type('author_test1')
      cy.get('#url_input').type('url_test1')
      cy.get('#create_blog_button').click()
    })
    it('A blog can be created', function () {
      cy.get('#new_blog_button').click()
      cy.get('#title_input').type('title_test')
      cy.get('#author_input').type('author_test')
      cy.get('#url_input').type('url_test')
      cy.get('#create_blog_button').click()
      cy.contains('title_test')
    })
    it('A blog can be liked', function () {
      cy.get('.view_button').click()
      cy.get('.like_button').click().click()
      cy.contains('2')
    })
    it('A blog can be deleted', function () {
      cy.get('.view_button').click()
      cy.get('#delete_button').click()
      cy.get('.view_button').should('not.exist');
    })
    it('Blogs are sorted', function () {
      cy.get('.view_button').click()
      cy.get('.like_button').click().click().click().click()
      cy.get('#hide_button').click()
      cy.get('#new_blog_button').click()
      cy.get('#title_input').type('title_test2')
      cy.get('#author_input').type('author_test2')
      cy.get('#url_input').type('url_test2')
      cy.get('#create_blog_button').click()
      cy.wait(1000)
      cy.get('.view_button').eq(1).click()
      cy.get('.like_button').eq(1).click().click().click().click().click().click().click()
      cy.get('#hide_button').click()
      cy.get('.blog').eq(0).contains('title_test2')
      cy.get('.blog').eq(1).contains('title_test1')
    })
  })
})