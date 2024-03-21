var express = require('express');
const { customerInfo, productInfo } = require('../Models/models');
const { json } = require('body-parser');
const { JSON } = require('sequelize');
var router = express.Router();

/* GET users listing. */
router.get('/customerInfo', async(req, res) =>{
  
    try{const customer = await customerInfo.findAll({
        include: [productInfo]
      })
      .then( (data) => {
        res.json(data);
      })
      .catch( err => {
        res.status(500).send(err);
        console.error(err);
    })}catch(err){
      res.status(500).send(err);
      console.error(err);

    }
  
});

router.get('/customerInfo/:id' , async(req,res) => {
  const req_id = req.params.id;
  await customerInfo.findOne({
    include : [productInfo],
    where : {customer_id : req_id}
  })
  .then( (data) => {
    //console.log(data);
    //console.log(Object.keys(data).length);
    if(data===null){
      res.status(400).send(`Invalid customer ID :(`);
      return;
    }
    res.json(data);
  })
  .catch( err => {
    // if(Object.keys(err).length===0){
    //   res.status(400).send(`Invalid customer ID :(`);
    //   return;
    // }
    res.status(500).send(err);
  })
})


// router.post('/customerInfo/:product_name' , async(req,res) => {
//   const product_name = req.params.product_name;
//   const {name,Address} = req.body;
//   var product_data;
//   await productInfo.findOne({
//     attributes : ['product_id'],
//     where : {product_name : product_name}
//   })
//   .then( (data) => {
//     if(data===null){
//       return res.status(404).send('requested product is not available');
      
//     }
//     product_data = data.product_id;
//   })
//   .catch(err => {
//     res.status(500).send(err);
//   });

//    const newCustomer = {
//     name:name,
//     Address: Address,
//     product_id : product_data
//   };

//   await customerInfo.create(newCustomer)
//   .then( (data) => {
//     res.send(`Customers details were Successfully updated`);
//   })
//   .catch( err => {
//     res.status(500).send(err);
//     console.error(err);
//   })
// });

router.post('/customerInfo/:product_name' , async(req,res) => {
  try {
    const product_name = req.params.product_name;
    const { name, Address } = req.body;

    // Find product information
    const productData = await productInfo.findOne({
      attributes: ['product_id'],
      where: { product_name: product_name }
    });
    console.log(productData);
    // Check if product is not found
    if (!productData) {
      return res.status(404).send('Requested product is not available');
    }

    // Create new customer
    const newCustomer = {
      name: name,
      Address: Address,
      product_id: productData.product_id
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



router.put('/customerInfo/:id' , async(req,res) => {
  try{
    const customer_Id = req.params.id;
    const {Address,product_name} = req.body;

    // Find product information
    const productData = await productInfo.findOne({
      attributes: ['product_id'],
      where: { product_name: product_name }
    });
    //console.log(productData);
    // Check if product is not found
    if (!productData) {
      return res.status(404).send('Requested product is not available');
    }

    const updatedCustomer = {
      Address : Address,
      product_id : productData.product_id
    }
    console.log(updatedCustomer);
    const updatedcustomerInfoRows = await customerInfo.update(updatedCustomer, {
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

router.delete('/customerInfo/:id' , async(req,res) => {
  try{
    const customer_Id = req.params.id;
    const deletedRows = await customerInfo.destroy({
      where : {customer_Id : customer_Id}
    });
    if(deletedRows==0){
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
