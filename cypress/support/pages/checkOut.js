export class CheckOutPage {
    constructor(){
    this.nameField = "#FirstName";
    this.lastNameField = "#lastName";
    this.creditCardNumber = "#cardNumber";
    this.purchase = ('//button[text()="Purchase"]');
    }

    writeNameField(variableOne){
        return cy.get(this.nameField).type(`${variableOne}`);
    }
    writeLastName(variableTwo){
        return cy.get(this.lastNameField).type(`${variableTwo}`)
    }
    writeCreditCard(variableThree){
        return cy.get(this.creditCardNumber).type(`${variableThree}`)
    }

    clickPurchase(){
        return cy.xpath(this.purchase).click();
    }

}