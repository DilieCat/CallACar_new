const Parkingfacility = require('../models/parkingfacility');

function getAll(req, res) {
    Parkingfacility.find()
        .then(parkingfacilities => {
            res.status(200).send(parkingfacilities);
        })
        .catch(err => {
            res.status(401).send(err);
        })
}

function createParkingfacility(req, res) {
    Parkingfacility.create({
        name: req.body.name,
        street: req.body.street,
        number: req.body.number
    })
        .then(() =>
            res.status(200).send("Succesfully created an parkingfacility."))
        .catch((err) => {
            res.status(401).send({ err });
        })
}

function remove(req, res) {
    Parkingfacility.findOne({ _id: req.headers._id })
        .then(parkingfacility => {
            if (parkingfacility === null) {
                res.status(401).send({ Error: 'Parkingfacility does not exist.' })
            }
            else {
                parkingfacility.delete()
                    .then(() => {
                        res.status(200).send({ Message: 'Parkingfacility succesfully removed.' })
                        console.log('>>>Parkingfacility removed')
                    });
            }
        });
};

module.exports = {
    getAll,
    createParkingfacility,
    remove
}