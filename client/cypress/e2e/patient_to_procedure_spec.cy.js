describe("Patient Process Flow Tests", () => {
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

  it("allows an admin to view the patient profile and process details", () => {
    cy.get("table")
      .should("be.visible")
      .find("tr")
      .its("length")
      .should("be.gt", 1);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("td").first().click();
      });

    cy.url().should("include", "/patient-info");

    cy.contains("View Process").click();
    cy.url().should("include", "/process-details");

    cy.contains("Process for").should("exist");
    cy.contains("Add Procedure").should("exist");

    cy.contains("Add Procedure").should("exist").click();
    cy.url().should("include", "/add-procedure");

    cy.get('input[placeholder="Operation (if needed)"]')
      .clear()
      .type("Updated Operation");
    cy.get('textarea[placeholder="Notes"]').clear().type("Updated Notes");

    cy.get('select[aria-label="Overseeing Doctor"] option').then(($options) => {
      const optionCount = $options.length;
      const randomIndex = Math.floor(Math.random() * optionCount);
      cy.get('select[aria-label="Overseeing Doctor"]').select(
        $options[randomIndex].text
      );
    });

    cy.get('select[aria-label="Department"] option').then(($options) => {
      const optionCount = $options.length;
      const randomIndex = Math.floor(Math.random() * optionCount);
      cy.get('select[aria-label="Department"]').select(
        $options[randomIndex].text
      );
    });

    cy.get('input[placeholder="Room"]').clear().type("Room 202");

    cy.get(".px-8.py-3.rounded-lg.font-semibold")
      .contains("Save Process")
      .click();

    
  });
});
