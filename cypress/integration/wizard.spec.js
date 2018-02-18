const APP_URL = Cypress.env("APP_URL");

describe("Wizard", function() {
  it("navigates correctly", function() {
    cy.visit(APP_URL);

    cy.contains("Quiero tomarme la linea");
    cy.contains("Roca").click();
    cy.url().should("include", "/roca");

    cy.contains("volver atrás");
    cy.contains("Ramal");
    cy.contains("Constitucion - La Plata").click();
    cy.url().should("include", "/roca/laplata");

    cy.contains("volver atrás").click();
    cy.url().should("include", "/roca");

    cy.contains("volver atrás");
    cy.contains("Ramal");
    cy.contains("Constitucion - La Plata").click();
    cy.url().should("include", "/roca/laplata");

    cy.contains("volver atrás");
    cy.contains("En la estación");
    cy.contains("Bernal").click();
    cy.url().should("include", "/roca/laplata/bernal");
  });
});
