// https://docs.cypress.io/api/introduction/api.html

describe('CreatePage', () => {

    let category = {
        name: 'Political Science Flashcards',
    }


    it('Tests out the CreatePage', () => {
        cy.visit('/create')

        // See if opening page is correct
        cy.contains('label', 'Existing Categories:');
        cy.should('not.contain', 'Flashcard Question:')

        // see if selecting category and adding a card works
        cy.get('[data-test="category-dropdown"]').select(category.name);
        cy.should('not.contain', 'Name of new Category:')
        cy.contains('label', 'Flashcard Question:');
        cy.contains('button', 'Create card').click();
        cy.contains('Please correct the above errors');
        // error for missing form requirements
        // fill in form and submit again
        cy.get('[id="input-2"]').type('New Question for Testing')
        cy.get('[id="input-3"]').type('New Answer for Testing')
        cy.should('not.contain', 'Please correct the above errors')
        cy.get('[id="input-2"]').should('have.value', 'New Question for Testing')

        cy.contains('button', 'Create card').click();
        cy.contains('Card added to ' + category.name);
        // form should be cleared, so the previous question should be removed
        cy.get('[id="input-2"]').should('not.have.value', 'New Question for Testing')


        // see if creating a new category and submitting works
        cy.get('[data-test="category-dropdown"]').select('Create New Category');
        cy.contains('label', 'Name of new Category:')
        cy.contains('label', 'Flashcard Question:');
        cy.contains('button', 'Create card').click();
        cy.contains('Please correct the above errors');
        // error for missing form requirements
        // fill in form and submit again
        cy.get('[id="newCat-1"]').type('New Category Name for Testing');
        cy.get('[id="newCat-2"]').type('New Category Description for Test');
        cy.get('[id="newCat-3"]').type('5');
        cy.get('[id="input-2"]').type('New Question for Testing')
        cy.get('[id="input-3"]').type('New Answer for Testing')
        cy.should('not.contain', 'Please correct the above errors')
        cy.get('[id="input-2"]').should('have.value', 'New Question for Testing')

        cy.contains('button', 'Create card').click();
        cy.contains('New Category and Card added!');
        // form should be cleared, so the previous question should be removed
        cy.get('[id="input-2"]').should('not.have.value', 'New Question for Testing')




    })
})
