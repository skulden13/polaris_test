/// <reference types="cypress" />

describe('Rent and free bikes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('rent 3 bikes and free 3 bikes', () => {
    cy.contains('No bikes are rented.').should('be.visible');

    // Rent 1
    const rentBtn = cy.contains('Rent a random bike');
    rentBtn.click();
    cy.contains('Bikes available: 2').should('be.visible');
    cy.contains('Bikes rented: 1').should('be.visible');

    // Rent 2
    rentBtn.click();
    cy.contains('Bikes available: 1').should('be.visible');
    cy.contains('Bikes rented: 2').should('be.visible');

    // Rent 3
    rentBtn.click();
    cy.contains('Bikes available: 0').should('be.visible');
    cy.contains('Bikes rented: 3').should('be.visible');
    cy.contains('No bikes are available for rent.').should('be.visible');

    // Free 1
    cy.get('.is-rented button:first').click();
    cy.contains('Bikes available: 1').should('be.visible');
    cy.contains('Bikes rented: 2').should('be.visible');

    // Free 2
    cy.get('.is-rented button:first').click();
    cy.contains('Bikes available: 2').should('be.visible');
    cy.contains('Bikes rented: 1').should('be.visible');

    // Free 3
    cy.get('.is-rented button:first').click();
    cy.contains('Bikes available: 3').should('be.visible');
    cy.contains('Bikes rented: 0').should('be.visible');

    cy.contains('No bikes are rented.').should('be.visible');
  });
});
