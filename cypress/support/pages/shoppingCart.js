export class ShopingCartPage{
  constructor()
  {
      this.showtotal = ('//button[text()="Show total price"]');
      this.total = "#price";
      this.goTocheckOut = ('//button[text()="Go to Checkout"]');
  }
  
  verifyPricesAndProducts(Name,Price){
      return cy.xpath(`//p[@name='${Name}']//following-sibling::p[@name=${Price}]`);

  }
  clickOnShowTotalPrice(){
      return cy.xpath(this.showtotal).click();
  }
  checkAcumulatePrice(){
      return cy.get(this.total);
  }
  clickOngoToCheckOut(){
      return cy.xpath(this.goTocheckOut).click();
  }
}