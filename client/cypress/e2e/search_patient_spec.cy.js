// describe('Search Patient Page Tests', () => {
//     let allPatients = [];
  
//     before(() => {
//       cy.request({
//         method: 'POST',
//         url: 'https://medical360-d65d823d7d75.herokuapp.com/patients/all',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: {
//           Why: "God"
//         },
//       }).then((response) => {
//         expect(response.status).to.equal(200);
//         allPatients = response.body.patients; 
//       });
//     });
  
//     beforeEach(() => {
//       cy.visit("/login");
//       cy.get("#Email").type("admin@example.com");
//       cy.get("#Password").type("admin@123");
//       cy.get("button").contains("Login").click();
  
//       cy.url().should("include", "/apppage");
//       cy.contains("Resource Management").click();
//       cy.url().should("include", "/resource-management");
//       cy.contains("Patients").click();
//     });
  
//     it('allows admin to filter a patient by name', () => {
//       expect(allPatients).to.have.length.greaterThan(0);
  
//       const randomPatient = allPatients[Math.floor(Math.random() * allPatients.length)];
//       const searchUserName = randomPatient.patientName; 
  
//       cy.get('input[data-cy=search-bar]').should('be.visible').type(searchUserName);
//       cy.get('[data-cy=search-button]').should('be.visible').click();
  
//       cy.url().should('include', '/all-patients');
  
//       allPatients
//         .filter((user) => user.name !== searchUserName)
//     });
//   });
  