// https://docs.cypress.io/api/introduction/api.html

describe('HomePage', () => {

  let category = {
    name: 'Political Science Flashcards',
    slug: 'political_science-flashcards'
  }


  it('Visits the HomePage', () => {
    cy.visit('/')
    cy.contains('h2', 'Welcome to Flash Study')
    cy.contains('h4', category.name)

    // Confirm we see at least 5 category links
    cy.get('[data-test="category-link"]').its('length').should('be.gte', 5);


    // Confirm we can click on a product and get to its individual page
    cy.get('[data-test="category-link"]').contains(category.name).click();
    cy.contains('h2', category.name);
    cy.contains('h4', 'Question:')

  })
})
