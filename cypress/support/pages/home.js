export class Home {
    constructor() {
        this.buttonOnLineShop = "#onlineshoplink";
    }

    clickButtonOnLineShop() {
        cy.get(this.buttonOnLineShop).click();
    }



}