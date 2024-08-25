describe("New Room Page Tests", () => {
    const roomTypes = ["ICU", "General", "Surgical", "Maternity"];
  
    function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
    function getRandomElements(arr, count) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    beforeEach(() => {
      cy.visit("/login");
      cy.get("#Email").type("admin@example.com");
      cy.get("#Password").type("admin@123");
      cy.get("button").contains("Login").click();
  
      cy.url().should("include", "/apppage");
      cy.contains("Resource Management").click();
  
      cy.contains("Rooms").click();
      cy.contains("New Room").click();
    });
  
    it("should allow filling the form and submitting it", () => {
      const randomRoomType = getRandomElement(roomTypes);
      const roomNumber = Math.floor(Math.random() * 500) + 100;
  
      cy.get("#roomNumber").type(roomNumber.toString());
      cy.get("#roomType").type(randomRoomType);
  
      const numberOfEquipmentToSelect = 2; 
      cy.get(".select__input").click();
      cy.get(".select__option").then(($options) => {
        const equipmentOptions = [...$options].map(option => option.innerText);
        const randomEquipmentItems = getRandomElements(equipmentOptions, numberOfEquipmentToSelect);
  
        randomEquipmentItems.forEach((equipment) => {
          cy.contains(".select__option", equipment).click();
          cy.get(".select__input").click(); 
        });
      });
      cy.get("body").click(0, 0);
  
      cy.get("#availabilityStatus").find("option").then(($options) => {
        const statuses = [...$options]
          .map((option) => option.innerText)
          .filter((text) => text !== "Select an option");
        const randomStatus = getRandomElement(statuses);
        cy.get("#availabilityStatus").should("be.visible").select(randomStatus);
      });
  
      cy.get("button").contains("Create Room").click();
      cy.visit("/all-rooms");
    });
  });
  