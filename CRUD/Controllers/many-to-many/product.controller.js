const customer = require('../../Models/customer');
const product = require('../../Models/product');
const customerProduct = require('../../Models/customerProduct');

module.exports.getProducts = async(req,res) => {
    try{
        const productInformation =  await product.findAll();
        res.json(productInformation);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.getProductById = async(req,res) => {
    try{
        const product_id = req.params.id;
        const productInformation = await product.findOne({
            where : {product_id : product_id }
        });
        res.json(productInformation);
    }catch(error){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.insertProduct = async(req,res) => {
    try{
        await product.create(req.body);
        res.send(`Product successfully added`);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.updateProduct = async(req,res) => {
    try{
        const product_id = req.params.id;
        const updatedProductInfoRows = await product.update(req.body,{
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
}

module.exports.deleteProduct = async(req,res) => {
    try{
        const product_id = req.params.id;
        
        const deletedProductInfoRows = await product.destroy({
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
}