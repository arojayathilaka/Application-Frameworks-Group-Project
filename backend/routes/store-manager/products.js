const router = require('express').Router();
const Product = require('../../models/store-manager/product.model');

/**
 * Get details of all the products from the database
 * @returns {Product[]} array of products / error message
 */
router.route('/').get((req, res) => {
    Product.find()
        .then(products =>
            res.status(200).send(products)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Add a new product to the database
 * @param {string} category Category of the product
 * @param {number} prodId Id of the product
 * @param {string} name Name of the product
 * @param {number} price Price of the product
 * @param {number} discount Discount of the product
 * @returns success or error message
 */
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
        .then(() => res.send({message: 'Product added!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Get details of a product from the database
 * @param object id of the product
 * @returns {Product} product / error message
 */
router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        //.then(product => res.json(product))
        .then(product => {
            res.status(200).send(product)
        })
        .catch(err =>
            res.status(400).send('Error: ' + err)
        );
});

/**
 * Delete a product from the database
 * @param object id of the product
 * @returns success or error message
 */
router.route('/delete/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.send({message: 'Product deleted!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Update details of a product
 * @param object id of the product
 * @returns success or error message
 */
router.route('/update/:id').put((req, res) => {
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
                .then(() => res.send({message:'Product updated!'}))
                .catch(err =>
                    res.status(400).send({message: 'Error: ' + err})
                );
        })
        .catch(err =>
            res.status(400).json('Error: ' + err)
        );
});

module.exports = router;