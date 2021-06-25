const Car = require('../models/car');

function getAll(req, res) {
    Car.find()
        .then(cars => {
            res.status(200).send(cars);
        })
        .catch(err => {
            res.status(401).send(err);
        })
}

function getAllAvailable(req, res) {
    Car.find({available: true})
        .then(cars => {
            res.status(200).send(cars);
        })
        .catch(err => {
            res.status(401).send(err);
        })
}

function createCar(req, res) {
    Car.create({
        class: req.body.class,
        brand: req.body.brand,
        type: req.body.type,
        drivenKm: req.body.drivenKm,
        available: req.body.available,
        price: req.body.price
    })
        .then(() =>
            res.status(200).send("Succesfully created an car."))
        .catch((err) => {
            res.status(401).send({ err });
        })
}

function remove(req, res) {
    Car.findOne({ _id: req.params.id })
        .then(car => {
            if (car === null) {
                res.status(401).send({ Error: 'Car does not exist.' })
            }
            else {
                car.delete()
                    .then(() => {
                        res.status(200).send({ Message: 'Car succesfully removed.' })
                        console.log('>>>Car removed')
                    });
            }
        });
};

module.exports = {
    getAll,
    createCar,
    remove,
    getAllAvailable
}