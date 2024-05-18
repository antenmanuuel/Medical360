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

  it("should randomly select a process and click on it", () => {
    cy.wait(1000);

    cy.get(".MuiGrid-container").then(($grid) => {
      const processes = $grid.find(".MuiGrid-item");
      const processCount = processes.length;

      expect(processCount).to.be.greaterThan(0);

      const randomIndex = Math.floor(Math.random() * processCount);

      cy.wrap(processes[randomIndex]).click();

      cy.url().should("include", "/process-details");
    });
  });
});
