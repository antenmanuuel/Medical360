describe("Room Deletion Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();

    cy.url().should("include", "/resource-management");
    cy.contains("Rooms").click();
    cy.url().should("include", "/all-rooms");
  });

  it('allows an admin to delete the first listed room and verify it is removed', () => {
    cy.get("table").should("be.visible");

    
    cy.get("td").first().invoke('text').then((roomName) => {
      
      cy.get("td").first().parents("tr").within(() => {
        cy.get("button").contains("Delete").click();
      });
      cy.get("button.bg-red-600").should("be.visible").click();

     
      cy.contains("Deleting...").should("not.exist");

     
      cy.contains("td", roomName.trim()).should("not.exist");
    });
  });
});