describe('Search Feedback Page Tests', () => {
  let allFeedbacks = [];

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://medical360-d65d823d7d75.herokuapp.com/feedbacks/all',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        Why: "god"
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      const { feedbackList } = response.body;
      if (Array.isArray(feedbackList)) {
        allFeedbacks = feedbackList;
      } else {
        console.error('Expected an array, but received:', feedbackList);
      }
    });
  });

  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Feedbacks").click();
  });

  it('allows admin to filter feedback by user name', () => {
    expect(allFeedbacks).to.have.length.greaterThan(0);

    const randomFeedback = allFeedbacks[Math.floor(Math.random() * allFeedbacks.length)];
    const searchUserName = randomFeedback.name; 

    if (!searchUserName) {
      throw new Error("The selected feedback does not have a valid 'userName' field.");
    }

    cy.get('input[data-cy=search-bar]').should('be.visible').type(searchUserName);
    cy.get('[data-cy=search-button]').should('be.visible').click();

    allFeedbacks
      .filter((feedback) => feedback.userName !== searchUserName)
  });
});
