const express = require('express');

const router = express.Router();

// admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><br><input type="text" name="size"><button type="submit">Add Product</button> </form>');
});

// admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log('Product Title: ', req.body.title);
    console.log('Product Size: ', req.body.size);
    res.redirect('/');
});

module.exports = router;