const author = require('../../Models/author');
const book = require('../../Models/book');

module.exports.getAuthors = async(req,res) => {
    try{
        const authorInformation =  await author.findAll();
        res.json(authorInformation);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.getAuthorById = async(req,res) => {
    try{
        const author_id = req.params.id;
        const authorInformation = await author.findOne({
            where : {author_id : author_id }
        });
        res.json(authorInformation);
    }catch(error){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.insertAuthor = async(req,res) => {
    try{
        const {author_name , book_name} = req.body;
        await author.create({
            author_name : author_name,
            books : {book_name : book_name}
        },{
            include : {model:book},
        });
        res.send(`Author successfully added`);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.updateAuthor = async(req,res) => {
    try{
        const author_id = req.params.id;
        const updatedAuthorRows = await author.update(req.body,{
            where : {author_id : author_id}
        });

        if(updatedAuthorRows==0){
            res.status(404).send(`Given Author ID is invalid`);
        }else{
            res.status(200).send(`Author name was successfully Updated`);
        }
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.deleteAuthor = async(req,res) => {
    try{
        const author_id = req.params.id;
        // const deletedBookRows = await book.destroy({
        //     where : {author_id : author_id}
        // })

        const deletedAuthorRows = await author.destroy({
            where : {author_id : author_id}
        })

        if(deletedAuthorRows == 0 ){
            res.status(404).send(`Given Author ID is invalid`);
        }else{
            res.status(200).send(`Author data was successfully deleted`);
        }
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}