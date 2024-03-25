var express = require('express');
const { customerInfo, productInfo ,customerProduct} = require('../Models/models');
const { json } = require('body-parser');
const { JSON } = require('sequelize');
var router = express.Router();


router.get('/customerInfo', async(req, res) =>{
  
    try{
      const customer = await customerInfo.findAll({
        include: productInfo
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
    include: [{
      model: productInfo,
      through: customerProduct
    }],
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
    res.status(500).send(err);
  })
})
 

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



router.put('/customerInfo/:id' , async(req,res) => {
  try{
    const customer_Id = req.params.id;
    const {Address} = req.body;

    

    const updatedCustomer = {
      Address : Address
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
