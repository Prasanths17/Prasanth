var express = require('express');
//const { customerInfo, productInfo } = require('../Models/models');
const sequelize = require('../Models/sequelizeConnection');
var router = express.Router();

const productInfo = require('../Models/productInfo');
const customerInfo = require('../Models/customerInfo');

router.get('/productInfo' , async(req,res) => {
    try{
        const productInformation =  await productInfo.findAll();
        res.json(productInformation);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
})

router.get('/productInfo/:id' , async(req,res) => {
    try{
        const product_id = req.params.id;
        const productInformation = await productInfo.findOne({
            where : {product_id : product_id }
        });
        res.json(productInformation);
    }catch(error){
        res.status(500).send(err);
        console.error(err);
    }
})

router.post('/productInfo' , async(req,res) => {
    try{
        await productInfo.create(req.body);
        res.send(`Product successfully added`);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
})

router.put('/productInfo/:id' , async(req,res) => {
    try{
        const product_id = req.params.id;
        const updatedProductInfoRows = await productInfo.update(req.body,{
            where : {product_id : product_id}
        });

        if(updatedProductInfoRows==0){
            res.status(404).send(`Given product ID is invalid`);
        }else{
            res.status(200).send(`Product was successfully Updated`);
        }
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
});

router.delete('/productInfo/:id' , async(req,res) => {
    try{
        const product_id = req.params.id;
        const deletedCustomerInfoRows = await customerInfo.destroy({
            where : {product_id : product_id}
        })

        const deletedProductInfoRows = await productInfo.destroy({
            where : {product_id : product_id}
        })

        if(deletedProductInfoRows == 0 ){
            res.status(404).send(`Given product ID is invalid`);
        }else{
            res.status(200).send(`Product was successfully deleted`);
        }
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
});
module.exports = router;