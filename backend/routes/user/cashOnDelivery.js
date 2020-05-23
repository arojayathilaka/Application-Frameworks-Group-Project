const router= require('express').Router();
let CashOnDelivery = require('../../models/user/cashOnDelivery.model');

router.route('/').get((req, res) => {
    CashOnDelivery.find()
        .then(cashOnDeliveries => res.json(cashOnDeliveries))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const deliveryAddress = req.body.deliveryAddress;
    const contactNumber = req.body.contactNumber;

    const newCashOnDelivery = new CashOnDelivery({deliveryAddress, contactNumber});

    newCashOnDelivery.save()
        .then(() => res.json('Delivery Address Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;