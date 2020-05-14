// https://docs.cypress.io/api/introduction/api.html

describe('CategoryPage', () => {

    let category = {
        name: 'Political Science Flashcards',
        slug: 'political_science-flashcards'
    }


    it('Test out the CategoryPage', () => {
        cy.visit('/category/' + category.slug)

        cy.contains('h2', category.name);

        cy.get('[data-test="load-card-button"]').contains('Load First Card').click();
        cy.contains('h4', 'Question:');
        cy.contains('Answer:');
        cy.contains('Submit');
        cy.get('[data-test="type-radio-buttons"]').contains('Study Mode').click();
        cy.contains('button', 'Next Question');


        cy.get('[data-test="type-radio-buttons"]').contains('Quiz Mode').click();
        cy.contains('button', 'Submit').click();
        cy.contains('Incorrect, try again!')

    })
})
