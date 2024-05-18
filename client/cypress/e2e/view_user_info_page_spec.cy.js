describe('View User Info ', () => {
    beforeEach(() => {
      cy.visit("/login");
      cy.get("#Email").type("admin@example.com");
      cy.get("#Password").type("admin@123");
      cy.get("button").contains("Login").click();
  
      cy.url().should("include", "/apppage");
      cy.contains("Resource Management").click();
  
      cy.url().should("include", "/resource-management");
      cy.contains("Users").click();
      cy.url().should("include", "/all-users");
    });
  
    it('allows an admin to view a users profile', () => {
      cy.get("table").should("be.visible").find("tr").its('length').should('be.gt', 1);
  
      cy.get("table tbody tr").first().within(() => {
        cy.get("td").first().click();
      });
    });
  });
  