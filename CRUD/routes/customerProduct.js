const express = require ('express');
const router = express.Router();
//const { customerProduct} = require('../Models/models');

const customer = require('../Models/customer');
const product = require('../Models/product');
const customerProduct = require('../Models/customerProduct');

router.get('/customerProduct' , async(req,res) => {
    try{
        const customerProductRelation = await customerProduct.findAll();
        res.json(customerProductRelation);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
});

router.get('/customerProduct/:id' , async(req,res) =>{
    try{
        const customer_Id = req.params.id;
        const customerProductRelation = await customerProduct.findOne({
            where : {customerProductId : customer_Id}
        });
        res.json(customerProductRelation);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
});

router.post('/customerProduct' , async(req,res) => {
    try{
        const {customer_id , product_id} = req.body;

        const newCustomerProduct = {
            customer_id : customer_id,
            product_id : product_id
        }

        await customerProduct.create(newCustomerProduct);
        res.send(`customerProduct details Successfully inserted`)
    }catch(err){
        console.error(error);
         res.status(500).send(err);
    }
});

router.put('/customerProduct/:id' , async(req,res) => {
    try{
        const input_id = req.params.id;
        const updatedRows = await customerProduct.update(req.body , {
            where : {customerProductId : input_id}
        });

        if(updatedRows == 0 ){
            res.status(404).send(`Given id is invalid :(`);
        }else{
            res.status(200).send(`customerProduct details were successfully updated :)`);
        }
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
});

router.delete('/customerProduct/:id' , async(req,res) => {
    try{
        const input_id = req.params.id;
        const deletedRows = await customerProduct.destroy({
            where : {customerProductId : input_id}
        })

        if(deletedRows == 0){
            res.status(404).send(`Given id is invalid :(`);
        }else{
            res.status(200).send(`CustomerProducte info successfully deleted :)`);
        }
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
})


module.exports=router;