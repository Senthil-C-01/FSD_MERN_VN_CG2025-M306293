const router=require('express').Router();
const c=require('../controllers/bookController');
router.post('/',c.createBook);
router.get('/',c.getAllBooks);
router.get('/:id',c.getBookById);
router.put('/:id',c.updateBookById);
router.delete('/:id',c.deleteBookById);
module.exports=router;
