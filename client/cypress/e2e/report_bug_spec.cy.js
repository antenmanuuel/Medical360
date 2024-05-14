describe("report bug", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("id@ika.gq");
    cy.get("#Password").type("password@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Report Bug").click();
  });
  it("should allow filling the form and submitting it", () => {
    cy.get("[name='name']").type("Louis Hines");
    cy.get("[name='email']").type("id@ika.gq");
    cy.get("[name='phone']").type("(921) 320-5855");
    cy.get("[name='bug']").type("Page is laggy please fix it");
    cy.get("button").contains("Submit").click();
  });
});


