describe('Search User Page Tests', () => {
  let allUsers = [];

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://medical360-d65d823d7d75.herokuapp.com/users',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        Why: "God"
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      allUsers = response.body.users; 
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
    cy.contains("Users").click();
  });

  it('allows admin to filter a user by name', () => {
    expect(allUsers).to.have.length.greaterThan(0);

    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
    const searchUserName = randomUser.name; 

    cy.get('input[data-cy=search-bar]').should('be.visible').type(searchUserName);
    cy.get('[data-cy=search-button]').should('be.visible').click();

    cy.url().should('include', '/all-users');

    allUsers
      .filter((user) => user.name !== searchUserName)
  });
});
