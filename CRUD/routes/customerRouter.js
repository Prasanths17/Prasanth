var express = require('express');
//const { customerInfo, productInfo ,customerProduct} = require('../Models/customer');

const customer = require('../Models/customer');
const product = require('../Models/product');
const customerProduct = require('../Models/customerProduct');

const { json } = require('body-parser');
const { JSON } = require('sequelize');
const { getCustomers, getCustomerById, insertCustomer, updateCustomer, deleteCustomer } = require('../Controllers/many-to-many/customer.controller');
const { newCustomerValidation, updateDetailsValidation } = require('../Controllers/many-to-many/customer.validate');
var router = express.Router();


router.get('/customer', getCustomers);

router.get('/customer/:id' , getCustomerById);
/*
router.post('/customerInfo' , async(req,res) => {
  try {
    const { name, Address } = req.body;

    // Create new customer
    const newCustomer = {
      name: name,
      Address: Address,
    };

    // Save new customer information
    await customerInfo.create(newCustomer);

    // Send success response
    res.send(`Customer details were successfully updated`);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
*/
/*
router.post('/customerInfo' , async(req,res) => {
  try{
    const {name , Address , productArray} = req.body;

    const neWCustomer = {
      name:name,
      Address:Address
    } 

    const Validation = async(product_id) => {
      const result = await productInfo.findOne({
        attributes:['product_id'],
        where : {product_id}
      });
      //console.log(result);
      return result!==null;
    }

    for(let productID of productArray){
      const isProductExist = await Validation(productID);
      //console.log(isProductExist);
      if(isProductExist==false){
        res.status(404).send(`Requested product with productId ${productID} is not available`);
        return;
      }
    }
    const data = await customerInfo.create(neWCustomer);

    const customerID = await customerInfo.findOne({
      attributes:['customer_id'],
      where : {name : name}
    })
    //await console.log(customerID);
 

    for(let i=0 ; i<productArray.length; i++){
      const newCustomerProduct = {
        customer_id : customerID.customer_id ,
        product_id : productArray[i]
      }
      await customerProduct.create(newCustomerProduct);

    }

    res.send(`customer successfully added`);
    
    

  }catch(err){
    console.error(err);
    res.status(500).send(err);
  }
})
*/
router.post('/customer',newCustomerValidation, insertCustomer);


router.put('/customer/:id' ,updateDetailsValidation, updateCustomer);

router.delete('/customer/:id' , deleteCustomer);

module.exports = router;


// productArray = [1,44,55,2,3,5];
// productExist = [];

// const notMatch = productArray.filter(productId => !productExist.some(product => product.product_id==productId) );