describe("Wizard", function() {
  before(function() {
    Cypress.on("window:before:load", win => {
      win.fetch = null;
    });
  });

  beforeEach(function() {
    cy.server();
  });

  it("navigates correctly", function() {
    cy.route({
      method: "GET",
      url: "/api/v1/data/11",
      response: "fixture:statuses/success"
    });

    cy.visit("/");

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
