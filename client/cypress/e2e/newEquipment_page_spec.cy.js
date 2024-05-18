describe("New Equipment Page Tests", () => {
  const roomTypes = {
    ICU: ["ECG Machine", "Ventilator", "Defibrillator"],
    General: ["Ultrasound", "X-Ray", "Blood Pressure Monitor"],
    Surgical: ["Anesthesia Machine", "Surgical Table", "Surgical Lights"],
    Maternity: ["Fetal Doppler", "Ultrasound", "Incubator"],
  };

  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();
    cy.contains("Equipment").click();
    cy.contains("New Equipment").click();
  });

  it("should allow filling the form and submitting it", () => {
    const randomRoomType = getRandomElement(Object.keys(roomTypes));
    const randomEquipment = getRandomElement(roomTypes[randomRoomType]);

    const randomEquipmentNumber = Math.floor(Math.random() * 100) + 1;
    const equipmentName = `${randomEquipment} ${randomEquipmentNumber}`;

    const randomQuantity = Math.floor(Math.random() * 10) + 1;

    const storageLocation = `${randomRoomType} Storage`;

    cy.get('input[name="equipmentName"]').type(equipmentName);
    cy.get('input[name="equipmentType"]').type(randomEquipment);
    cy.get('input[name="quantity"]').type(randomQuantity.toString());
    cy.get('input[name="location"]').type(storageLocation);
    cy.get('select[name="maintenanceStatus"]').should("be.visible").select("Operational");

    cy.get("button").contains("Create Equipment").click();
  });
});
