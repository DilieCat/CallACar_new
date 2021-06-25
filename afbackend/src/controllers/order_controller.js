const Order = require('../models/order');

function getAll(req, res) {
    Order.find()
        .then(orders => {
            res.status(200).send(orders);
        })
        .catch(err => {
            res.status(401).send(err);
        })
}

function getUserOrder(req, res){
    Order.find({user: req.params.id})
    .then(orders => {
        res.status(200).send(orders);
    })
    .catch(err => {
        res.status(401).send(err);
    })
}

function createOrder(req, res) {
    Order.create({
        user: req.body.user,
        startLocation: req.body.startLocation,
        endLocation: req.body.endLocation,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        car: req.body.car,
        drivenKm: req.body.drivenKm,
        costs: req.body.cost
    })
        .then(() =>
            res.status(200).send("Succesfully created an order."))
        .catch((err) => {
            res.status(401).send({ err });
        })
}

function remove(req, res) {
    Order.findOne({ _id: req.headers._id })
        .then(order => {
            if (order === null) {
                res.status(401).send({ Error: 'Order does not exist.' })
            }
            else {
                order.delete()
                    .then(() => {
                        res.status(200).send({ Message: 'Order succesfully removed.' })
                        console.log('>>>Order removed')
                    });
            }
        });
};

module.exports = {
    getAll,
    createOrder,
    remove,
    getUserOrder
}