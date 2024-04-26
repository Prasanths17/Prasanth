const customer = require('../../Models/customer');
const product = require('../../Models/product');
const customerProduct = require('../../Models/customerProduct');

module.exports.getCustomers = async(req, res) =>{
  
    try{
      const data = await customer.findAll({
        include: product
      })
      
        res.json(data);
     
      
    }catch(err){
      res.status(500).send(err);
      console.error(err);
    }
  
}

module.exports.getCustomerById = async(req,res) => {
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
}

module.exports.insertCustomer = async (req, res) => {
    try {
      const { name, Address, productArray } = req.body;
  
      // Check if all products in productArray exist
      const productsExist = await product.findAll({
        attributes: ['product_id'],
        where: { product_id: productArray }
      });
  
      // If the length of productsExist is not equal to the length of productArray,
      // it means some products in productArray do not exist in the database
      // console.log(productsExist);
      // console.log(productsExist.length);
      // console.log(productArray.length);
      if (productsExist.length !== productArray.length) {
        const nonExistingProducts = productArray.filter(productId => !productsExist.some(product => product.product_id === productId));
        return res.status(404).send(`Requested products with productIds ${nonExistingProducts.join(', ')} are not available`);
      }
  
      const createdCustomer = await customer.create({
        name: name,
        Address: Address,
        products: productArray.map(productId => ({ product_id: productId })) 
      
      });

      await createdCustomer.addProducts(productArray);
  
      res.send(`Customer successfully added`);
      
     
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
}

module.exports.updateCustomer = async(req,res) => {
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
  
      if (updatedcustomerInfoRows == 0) {
        console.log("Invalid id");
        res.status(404).send(`Invalid id or Same details are given for update`);
      } else {
          res.status(200).send(`Customer details were successfully updated`);
      }
    
    }catch(error){
      res.status(500).send(error);
      console.error(error);
    }
}

module.exports.deleteCustomer = async(req,res) => {
    try{
      const customer_Id = req.params.id;
      
      const deletedCustomerRows = await customer.destroy({
        where : {customer_id : customer_Id},
        include : [{
            model:customerProduct,
            onDelete : 'CASCADE'
        }]
      })
      
      if(deletedCustomerRows==0){
        res.status(404).send(`Given customer_Id is Invalid`);
      }else {
        res.status(200).send(`Customer details were successfully deleted`);
      }
    }catch(err){
      res.status(500).send(err);
      console.error(err);
    }
  
  
}
/*
 const deletedCustomerRows = await customer.destroy({
        where : {customer_Id : customer_Id}
      });
  
      const deletedCustomerProductRows = await customerProduct.destroy({
        where : {customer_id : customer_Id}
      })
*/
/*
// Insert the new customer into the database
      const createdCustomer = await customer.create(newCustomer);
  
      // Retrieving the id
      const customerID = createdCustomer.customer_id;
  
          
      const customerProducts = productArray.map(productId => ({
        customer_id: customerID,
        product_id: productId
      }));
  
      // Create entries in customerProduct table for the newly created customer
      await customerProduct.bulkCreate(customerProducts);
*/