const author = require('../../Models/author');
const book = require('../../Models/book');

module.exports.getBooks = async(req, res) =>{
  
    try{
        const data = await book.findAll({
        include: [author]
      })
     
        res.json(data);
    
    }catch(err){
      res.status(500).send(err);
      console.error(err);

    }
  
}

module.exports.getBooksById = async(req,res) => {
    try{
        const req_id = req.params.id;
        const data = await book.findOne({
            include : [author],
            where : {book_id : req_id}
        })
        if(data===null){
            res.status(400).send(`Invalid book ID :(`);
            return;
          }
          res.json(data);
    }catch(err){
        res.status(500).send(err);
    }
 
}

module.exports.insertBook = async(req,res) => {
    try {
      
      const { book_name,author_name  } = req.body;
      console.log(book_name);
      // Find product information
      const AuthorData = await author.findOne({
        attributes: ['author_id'],
        where: { author_name : author_name }
      });
      //console.log(AuthorData);
      // Check if author is not found
      if (!AuthorData) {
        
        await author.create({
          author_name : author_name,
          books : {book_name : book_name},
        },{
          include : [{ model: book}],
        })
      
        return res.status(200).send(`new Author with book was inserted`)
      }
  
      // Create new customer
      const newBook = {
        book_name: book_name,
        author_id: AuthorData.author_id
      };
  
      // Save new customer information
      await book.create(newBook);
  
      // Send success response
      res.send(`Book details were successfully updated`);
    } catch (error) {
      
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

module.exports.updateBook = async(req,res) => {
    try{
      const book_Id = req.params.id;
      const {book_name} = req.body;
  
      
      const updatedBook = {
        book_name : book_name
      }
      console.log(updatedBook);
      const updatedBookRows = await book.update(updatedBook, {
        where : {book_id : book_Id}
      });
  
      if (updatedBookRows == 0 ) {
        console.log("Invalid id");
        res.status(404).send(`Invalid id or Same details are given for update`);
    } else {
        res.status(200).send(`Book details were successfully updated`);
    }
    
    }catch(error){
      res.status(500).send(error);
      console.error(error);
    }
  }

module.exports.deleteBook = async(req,res) => {
    try{
      const book_Id = req.params.id;
      const deletedRows = await book.destroy({
        where : {book_id : book_Id}
      });
      if(deletedRows==0){
        res.status(404).send(`Given book_Id is Invalid`);
      }else {
        res.status(200).send(`Book details were successfully deleted`);
      }
    }catch(err){
      res.status(500).send(err);
      console.error(err);
    }
  
  
  }