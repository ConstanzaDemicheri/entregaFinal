export class ReciptPage{
    constructor(){
        this.thankYouButton = "//button[text()='Thank you']";
        this.completeName = "#name";
        this.cardNumber = "#creditCard";
        this.totalPrice = "#totalPrice";
        this.loading = "div[role='progressbar']";
    }
verifythankYouButton(){
    return cy.xpath(this.thankYouButton, { timeout: 10000});
}
verifyLoading(){
    return cy.get(this.loading);
}
verifyCompleteName(){
    return cy.get(this.completeName);
}
verifyCardNumber(){
    return cy.get(this.cardNumber);
}
verifyProduct(verifyproduct)
    {
        return cy.xpath(`//p[text()='${verifyproduct}']`, {timeout: 10000});
    }
verifyAmountTotal(total){
        return cy.get(this.totalPrice).invoke("text").then(() => {
        cy.contains(total);
    });
}

}