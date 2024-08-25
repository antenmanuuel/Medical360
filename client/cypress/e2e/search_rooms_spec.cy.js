describe('Search Room Page Tests', () => {
  let allRooms = [];

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://medical360-d65d823d7d75.herokuapp.com/rooms/all',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        Why: "god"
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      allRooms = response.body.rooms; 
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
    cy.contains("Rooms").click();
  });

  it('allows users to filter patients', () => {
    expect(allRooms).to.have.length.greaterThan(0);

    const randomRoom = allRooms[Math.floor(Math.random() * allRooms.length)];
    const searchRoomNumber = randomRoom.roomNumber; 

    cy.get('input[data-cy=search-bar]').should('be.visible').type(searchRoomNumber);
    cy.get('[data-cy=search-button]').should('be.visible').click();

    cy.url().should('include', '/all-rooms');
    cy.get('[data-cy^="room-"]').should('have.length', 1);
    cy.get('[data-cy^="room-"]').first().should('contain', searchRoomNumber);

    allRooms
      .filter((room) => room.roomNumber !== searchRoomNumber)
      .forEach((room) => {
        cy.get('[data-cy^="room-"]').should('not.contain', room.roomNumber);
      });
  });
});
