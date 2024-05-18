describe("New User Page Tests", () => {
  const getRandomName = () => {
    const firstNames = ["John", "Jane", "Sam", "Lucy", "Chris", "Alex"];
    const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Lee", "Martinez"];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const getRandomEmail = (name) => {
    const domains = ["example.com", "test.com", "sample.org"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${name.toLowerCase().replace(" ", ".")}@${domain}`;
  };

  const getRandomPhoneNumber = () => {
    const prefix = ["123", "456", "789", "234", "567"];
    const areaCode = prefix[Math.floor(Math.random() * prefix.length)];
    const randomDigits = () => Math.floor(Math.random() * 8999) + 1000; 
    return `${areaCode}${randomDigits()}${randomDigits()}`;
  };

  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();

    cy.contains("Users").click();
    cy.contains("New User").click();
  });

  it("should allow filling the form and submitting it with random values", () => {
    // Generate random values
    const randomName = getRandomName();
    const randomEmail = getRandomEmail(randomName);
    const randomPhoneNumber = getRandomPhoneNumber();
    const randomPassword = "password123"; 

    cy.get("[name='name']").type(randomName);
    cy.get("[name='email']").type(randomEmail);
    cy.get("[name='password']").type(randomPassword);
    cy.get("[name='pwConfirm']").type(randomPassword);
    cy.get("[name='phoneNumber']").type(randomPhoneNumber);

    cy.get("button").contains("Create New User").click();
    cy.visit("/all-users");
  });
});
