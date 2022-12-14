export class ProductsPage{
    constructor(){
        
        this.modalButton = ('#closeModal');
       
        this.buttonGoShoppingCart = ('#goShoppingCart');
    }
    selectProduct(product){
        cy.get(`button[value='${product}']`).click();
    }
        clickOnClosemodal()
    {
        cy.get(this.modalButton).click();
    }
     clickButtonGoShoppingCart()
    {
        cy.get(this.buttonGoShoppingCart).click();
    }

}