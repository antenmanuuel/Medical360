describe('Edit Patient Page', () => {
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

  it('allows an admin to edit the first patient', () => {
    cy.get("table").should("be.visible").find("tr").its('length').should('be.gt', 1);

    cy.get("table tbody tr").first().within(() => {
      cy.get("button").contains("Edit").click();
    });

    cy.url().should("include", "/edit-patient");

    cy.get('#patientName').clear().type('John Doe');
    cy.get('#patientName').should('have.value', 'John Doe');

    cy.get('button').contains('Save').click();

    cy.url().should("include", "/all-patients");

    cy.contains('John Doe').should('exist');
  });
});
