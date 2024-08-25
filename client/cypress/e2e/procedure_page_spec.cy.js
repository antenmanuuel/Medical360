describe("Process and Procedure Flow Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Processes").click();
    cy.url().should("include", "/all-processes");
  });

  it("should randomly select a process, go to details, add a procedure, and submit the form", () => {
    cy.wait(1000);
    cy.get(".MuiGrid-container").then(($grid) => {
      const processes = $grid.find(".MuiGrid-item");
      const processCount = processes.length;

      expect(processCount).to.be.greaterThan(0);

      const randomIndex = Math.floor(Math.random() * processCount);

      cy.wrap(processes[randomIndex]).click();

      cy.url().should("include", "/process-details");

      cy.contains("Add Procedure").click();

      cy.url().should("include", "/add-procedure");

      cy.get('input[placeholder="Operation (if needed)"]').should("exist");
      cy.get('textarea[placeholder="Notes"]').should("exist");
      cy.get('select[aria-label="Overseeing Doctor"]').should("exist");
      cy.get('select[aria-label="Department"]').should("exist");
      cy.get('input[placeholder="Room"]').should("exist");

      cy.get('input[placeholder="Operation (if needed)"]')
        .clear()
        .type("Updated Operation");
      cy.get('textarea[placeholder="Notes"]').clear().type("Updated Notes");

      cy.get('select[aria-label="Overseeing Doctor"] option').then(
        ($options) => {
          const optionCount = $options.length;
          const randomIndex = Math.floor(Math.random() * optionCount);
          cy.get('select[aria-label="Overseeing Doctor"]').select(
            $options[randomIndex].text
          );
        }
      );

      cy.get('select[aria-label="Department"] option').then(($options) => {
        const optionCount = $options.length;
        const randomIndex = Math.floor(Math.random() * optionCount);
        cy.get('select[aria-label="Department"]').select(
          $options[randomIndex].text
        );
      });

      cy.get('input[placeholder="Room"]').clear().type("Room 350");

      // Set date and time using date picker and time picker
      // cy.get('input[placeholder="Start Date"]').click().type('2023-12-31');
      // cy.get('input[placeholder="Start Time"]').click().type('08:00 AM');
      // cy.get('input[placeholder="End Date"]').click().type('2023-12-31');
      // cy.get('input[placeholder="End Time"]').click().type('10:00 AM');

      cy.get(".px-8.py-3.rounded-lg.font-semibold")
        .contains("Save Process")
        .click();

     
    });
  });
});
