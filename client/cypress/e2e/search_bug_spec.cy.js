describe('Search Bug Page Tests', () => {
  let allBugs = [];

  // Fetch all bugs before running the tests
  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://medical360-d65d823d7d75.herokuapp.com/bugs/all', // Adjust the URL based on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        Why: "god"
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      // Extract bug list from the response
      const { bugList } = response.body;
      if (Array.isArray(bugList)) {
        allBugs = bugList;
      } else {
        console.error('Expected an array, but received:', bugList);
      }
    });
  });

  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Bugs").click();
  });

  it('allows admin to filter a bug by user name', () => {
    // Ensure there are bugs available
    expect(allBugs).to.have.length.greaterThan(0);

    // Pick a random bug and use the associated user's name for filtering
    const randomBug = allBugs[Math.floor(Math.random() * allBugs.length)];
    const searchUserName = randomBug.name; // Adjust based on your bug object structure

    // Perform the search
    cy.get('input[data-cy=search-bar]').should('be.visible').type(searchUserName);
    cy.get('[data-cy=search-button]').should('be.visible').click();

    allBugs
      .filter((bug) => bug.reportedBy !== searchUserName)
  });
});
