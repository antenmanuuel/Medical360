describe("give feedback", () => {
    beforeEach(() => {
      cy.visit("/login");
      cy.get("#Email").type("rojefbo@tif.cn");
      cy.get("#Password").type("password@123");
      cy.get("button").contains("Login").click();
  
      cy.url().should("include", "/apppage");
      cy.contains("Give Feedback").click();
  
      
    });
    it("should allow filling the form and submitting it", () => {
      cy.get("[name='name']").type("Martin Roy");
      cy.get("[name='email']").type("rojefbo@tif.cn");
        // Click on the third star for the rating
    cy.get(".text-gray-400").eq(4).click();
      cy.get("[name='comments']").type("This page is great");
  
      cy.get("button").contains("Submit").click();
    });
  });
  