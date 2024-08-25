describe("All Process Page Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Processes").click();
    cy.url().should("include", "/all-processes");
  });

  it("should randomly search for a process and verify the result", () => {
    cy.wait(1000);

    cy.get(".MuiGrid-container").then(($grid) => {
      const processes = $grid.find(".MuiGrid-item");
      const processCount = processes.length;

      expect(processCount).to.be.greaterThan(0);
      const processNames = [];
      processes.each((index, process) => {
        const processName = Cypress.$(process).find(".process-name").text();
        if (processName) {
          processNames.push(processName.trim());
        }
      });

      expect(processNames).to.have.length.greaterThan(0);
      const randomIndex = Math.floor(Math.random() * processNames.length);
      const randomProcessName = processNames[randomIndex];

      if (randomProcessName) {
        cy.get('input[aria-label="Search"]').type(randomProcessName);

        cy.get(".MuiGrid-container .MuiGrid-item").each(($process) => {
          cy.wrap($process)
            .find(".process-name")
            .should("contain.text", randomProcessName);
        });
      } else {
        throw new Error("Randomly selected process name is empty");
      }
    });
  });
});
