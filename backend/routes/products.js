const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const category = req.body.category;
    const prodId = Number(req.body.prodId);
    const name = req.body.name;
    const price = Number(req.body.price);
    const discount = Number(req.body.discount);
    const comments = req.body.comments;
    const ratings = Number(req.body.ratings);

    const newProduct = new Product({
        category,
        prodId,
        name,
        price,
        discount,
        comments,
        ratings
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.category = req.body.category;
            product.prodId = req.body.prodId;
            product.name = req.body.name;
            product.price = req.body.price;
            product.discount = req.body.discount;
            product.comments = req.body.comments;
            product.ratings = req.body.ratings;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;