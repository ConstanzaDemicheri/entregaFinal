/// <reference types="cypress" />


import { Home } from "../support/pages/home";
import { ProductsPage } from "../support/pages/products";
import { ShopingCartPage } from "../support/pages/shoppingCart";
import { CheckOutPage } from "../support/pages/checkOut"
import { ReciptPage } from "../support/pages/recipt";


describe('entregafinalcypress', () => {
    
  let productsshop;
  let checkout;
  
  const user = "constanzaDemicheri";

  const home = new Home();
  const productsPage = new ProductsPage();
  const shopingCartPage = new ShopingCartPage();
  const checkOutPage = new CheckOutPage();
  const reciptPage = new ReciptPage();



  
  before('Before', () => {

      
      cy.fixture('productsshop').then(products =>{
          productsshop = products
      })
      cy.fixture('checkout').then(checkouts =>{
          checkout = checkouts
      })

      cy.request({
      url: "https://pushing-it.onrender.com/api/register",
      method: "POST",
      body: {
          username: user,
          password: "123456!",
          gender: "other",
          day: "16",
          month: "10",
          year: "1992",
    },
  })
    .then((respuesta) => {
      expect(respuesta.status).equal(200);
    })
    .then(() => {
      cy.request({
        url: "https://pushing-it.onrender.com/api/login",
        method: "POST",
        body: {
          username: user,
          password: "123456!",
        },
      }).then(respuesta => {
        window.localStorage.setItem('token', respuesta.body.token)
        window.localStorage.setItem('user', respuesta.body.user.username)
      });
    })
      cy.visit('');
  })

  it('entrega Final', () => {

      let suma = (productsshop.productOne.Price1) + (productsshop.productTwo.Price2);
      let completename = (checkout.Profile.Name)+(checkout.Profile.Lastname)
      
      
      home.clickButtonOnLineShop();
      productsPage.selectProduct(productsshop.productOne.Name);
      productsPage.clickOnClosemodal();
      productsPage.selectProduct(productsshop.productTwo.Name);
      productsPage.clickOnClosemodal();
      productsPage.clickButtonGoShoppingCart();
      reciptPage.verifyProduct(productsshop.productOne.Name).should("have.text", productsshop.productOne.Name);
      shopingCartPage.verifyPricesAndProducts(productsshop.productOne.Name,productsshop.productOne.Price1).should("have.text",`$${productsshop.productOne.Price1}`);
      reciptPage.verifyProduct(productsshop.productTwo.Name).should("have.text", productsshop.productTwo.Name);
      shopingCartPage.verifyPricesAndProducts(productsshop.productTwo.Name,productsshop.productTwo.Price2).should("have.text",`$${productsshop.productTwo.Price2}`);
      shopingCartPage.clickOnShowTotalPrice()
      shopingCartPage.checkAcumulatePrice().should('have.text',suma);
      shopingCartPage.clickOngoToCheckOut()
      checkOutPage.writeNameField(checkout.Profile.Name);
      checkOutPage.writeLastName(checkout.Profile.Lastname);
      checkOutPage.writeCreditCard(checkout.Profile.creditCardNumber);
      checkOutPage.clickPurchase()
      reciptPage.verifyLoading().should("exist");
      reciptPage.verifythankYouButton().should("have.text","Thank you");
      reciptPage.verifyCompleteName().invoke('text').then((sectext) => {
      assert.notStrictEqual(sectext, completename)});
      reciptPage.verifyProduct(productsshop.productOne.Name).should("have.text", productsshop.productOne.Name);
      reciptPage.verifyProduct(productsshop.productTwo.Name).should("have.text", productsshop.productTwo.Name);
      reciptPage.verifyCardNumber().should("have.text", checkout.Profile.creditCardNumber);
      reciptPage.verifyAmountTotal(suma);
  });
  after(() => {
    cy.request({
      url: `https://pushing-it.onrender.com/api/deleteuser/${user}`,
      method: "DELETE",
      }).then(respuesta => {
        window.localStorage.setItem('token', respuesta.body.token)
        window.localStorage.setItem('user', respuesta.body.user.username)
      
      });
    });
});