describe('Search Equipment Page Tests', () => {
  let allEquipments = [];

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://medical360-d65d823d7d75.herokuapp.com/equipments/all',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        Why: "god"
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      allEquipments = response.body.equipmentList; 
    });
  });

  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();
    cy.url().should("include", "/resource-management");
    cy.contains("Equipment").click();
  });

  it('allows users to filter equipment', () => {
    expect(allEquipments).to.have.length.greaterThan(0);

    const randomEquipment = allEquipments[Math.floor(Math.random() * allEquipments.length)];
    const searchEquipmentName = randomEquipment.equipmentName; 

    cy.get('input[data-cy=search-bar]').should('be.visible').type(searchEquipmentName);
    cy.get('[data-cy=search-button]').should('be.visible').click();

    cy.url().should('include', '/all-equipments');
    cy.get('[data-cy^="equipment-"]').first().should('contain', searchEquipmentName);

    
  });
});
