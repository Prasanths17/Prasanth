var express = require('express');
//const { customerInfo, productInfo ,customerProduct} = require('../Models/customer');

const customer = require('../Models/customer');
const product = require('../Models/product');
const customerProduct = require('../Models/customerProduct');

const { json } = require('body-parser');
const { JSON } = require('sequelize');
var router = express.Router();


router.get('/customer', async(req, res) =>{
  
    try{
      const data = await customer.findAll({
        include: product
      })
      
        res.json(data);
     
      
    }catch(err){
      res.status(500).send(err);
      console.error(err);
    }
  
});

router.get('/customer/:id' , async(req,res) => {
  try{
    const req_id = req.params.id;
    const data = await customer.findOne({
      include: [{
        model: product,
        through: customerProduct
      }],
      where : {customer_id : req_id}
    })

    if(data===null){
      res.status(400).send(`Invalid customer ID :(`);
      return;
    }
    res.json(data);

  }catch(err){
    res.status(500).send(err);
  }
})
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
router.post('/customer', async (req, res) => {
  try {
    const { name, Address, productArray } = req.body;

    // Check if all products in productArray exist
    const productsExist = await product.findAll({
      attributes: ['product_id'],
      where: { product_id: productArray }
    });

    // If the length of productsExist is not equal to the length of productArray,
    // it means some products in productArray do not exist in the database
    console.log(productsExist);
    console.log(productsExist.length);
    console.log(productArray.length);
    if (productsExist.length !== productArray.length) {
      const nonExistingProducts = productArray.filter(productId => !productsExist.some(product => product.product_id === productId));
      return res.status(404).send(`Requested products with productIds ${nonExistingProducts.join(', ')} are not available`);
    }

    // Create a new customer
    const newCustomer = {
      name: name,
      Address: Address
    };
    
    // Insert the new customer into the database
    const createdCustomer = await customer.create(newCustomer);

    // Retrieve the ID of the newly created customer
    const customerID = createdCustomer.customer_id;

    // Map productArray to an array of objects with customer_id and product_id
    const customerProducts = productArray.map(productId => ({
      customer_id: customerID,
      product_id: productId
    }));

    // Create entries in customerProduct table for the newly created customer
    await customerProduct.bulkCreate(customerProducts);

    res.send(`Customer successfully added`);
   
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


router.put('/customer/:id' , async(req,res) => {
  try{
    const customer_Id = req.params.id;
    const {Address} = req.body;

    

    const updatedCustomer = {
      Address : Address
    }
    console.log(updatedCustomer);
    const updatedcustomerInfoRows = await customer.update(updatedCustomer, {
      where : {customer_id : customer_Id}
    });

    if (updatedcustomerInfoRows == 0 ) {
      console.log("Invalid id");
      res.status(404).send(`Invalid id or Same details are given for update`);
    } else {
        res.status(200).send(`Customer details were successfully updated`);
    }
  
  }catch(error){
    res.status(500).send(error);
    console.error(error);
  }
});

router.delete('/customer/:id' , async(req,res) => {
  try{
    const customer_Id = req.params.id;
    const deletedCustomerRows = await customer.destroy({
      where : {customer_Id : customer_Id}
    });

    const deletedCustomerProductRows = await customerProduct.destroy({
      where : {customer_id : customer_Id}
    })

    if(deletedCustomerRows==0 && deletedCustomerProductRows==0){
      res.status(404).send(`Given customer_Id is Invalid`);
    }else {
      res.status(200).send(`Customer details were successfully deleted`);
    }
  }catch(err){
    res.status(500).send(err);
    console.error(err);
  }


})

module.exports = router;


// productArray = [1,44,55,2,3,5];
// productExist = [];

// const notMatch = productArray.filter(productId => !productExist.some(product => product.product_id==productId) );