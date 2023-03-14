/// <reference types="cypress" />

const BIKES = [
  'Giant TCR Advanced 1',
  'Cannondale SuperSix EVO',
  'Cube Cross Race',
];

const SERVER_URL = 'http://localhost:8000/';
const API = `${SERVER_URL}/app/api/`;

describe('Add bikes', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.request(
      'DELETE',
      `${API}delete/`,
      JSON.stringify({ names: BIKES }),
    );
  });

  it('add 3 bikes', () => {
    BIKES.forEach((item, index) => {
      cy.contains('Add New').click();
      const input = cy.get('[placeholder="Enter a Bike Name"');

      if (cy.contains(item).should('not.exist')) {
        input.type(item);
        cy.contains('Save Bike').click();
        cy.contains(`Bikes available: ${index + 1}`).should('be.visible');
      }
      cy.contains('Close').click();
    });

    cy.contains('No bikes are rented.').should('be.visible');
  });
});
