const router= require('express').Router();
let ProductDetails = require('../models/productDetails.model');

router.route('/').get((req, res) => {
    ProductDetails.find()
        .then(productDetails => res.json(productDetails))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const comments = req.body.comments;
    const ratings = req.body.ratings;

    const newProductDetails = new ProductDetails({
        comments,
        ratings
    });

    newProductDetails.save()
        .then(() => res.json('Comments and Ratings Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    ProductDetails.findById(req.params.id)
        .then(cartItem => res.json(cartItem))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    ProductDetails.findByIdAndDelete(req.params.id)
        .then(() => res.json('Added Comments and Ratings deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    ProductDetails.findById(req.params.id)
        .then(productDetails => {
            productDetails.comments = req.body.comments;
            productDetails.ratings = req.body.ratings;

            productDetails.save()
                .then(() => res.json('Comments and Ratings Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;