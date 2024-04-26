describe("view Patient Profile", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource and User Management").click();

    cy.url().should("include", "/resource-management");
    cy.contains("Patients").click();
    cy.url().should("include", "/all-patients");
  });

  it("allows an admin to view the first patient", () => {
    // Ensure the table is visible and has at least one entry
    cy.get("table")
      .should("be.visible")
      .find("tr")
      .its("length")
      .should("be.gt", 1);

    // Click the row to view user info
    cy.get("table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("td").eq(1).click();
      });
    cy.get("button").contains("Add Procedure").click();
    cy.get('input[type="text"]').first().type("Knee Surgery");

    cy.get("textarea").type("Perform knee surgery");

    cy.get("button").contains("Add Process").click();
  });
});
