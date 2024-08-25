describe("discharge a patient", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();

    cy.url().should("include", "/resource-management");
    cy.contains("Patients").click();
    cy.url().should("include", "/all-patients");
  });

  it("allows an admin to discharge the patient", () => {
    cy.get("table")
      .should("be.visible")
      .find("tr")
      .its("length")
      .should("be.gt", 1);

    cy.get("table tbody tr").contains("td", "admitted").scrollIntoView().click();

    cy.get("button").contains("Discharge Patient").click();

    cy.get("button.bg-red-600").contains("Discharge").should("be.visible").click();
  });
});
