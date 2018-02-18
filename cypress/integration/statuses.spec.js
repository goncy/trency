describe("Statuses", function() {
  before(function() {
    Cypress.on("window:before:load", win => {
      win.fetch = null;
    });
  });

  beforeEach(function() {
    cy.server();
  });

  it("shows the ui for success response correctly", function() {
    cy.route("GET", "/api/v1/data/11", "fixture:statuses/success");

    cy.visit("/#/roca/laplata/bernal");

    cy.contains("Destino La Plata");
    cy.contains("Destino Constitucion");
    cy.contains("Tren parado");

    cy.contains("Esperando a la linea Roca");
    cy.contains("Ramal Constitucion - La Plata");
    cy.contains("En la estación Bernal");
  });

  it("shows the ui for empty response correctly", function() {
    cy.route("GET", "/api/v1/data/11", "fixture:statuses/empty");

    cy.visit("/#/roca/laplata/bernal");

    cy.contains(
      "El servidor respondio correctamente, pero sin resultados, es muy posible que no se encuentren formaciones circulando en este horario, intente de nuevo mas tarde"
    );
    cy.contains("volver atrás");
  });
});
