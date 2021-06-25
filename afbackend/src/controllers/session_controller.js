const Session = require('../models/session');
const User = require('../models/user')
const Order = require('../models/order')
const Car = require('../models/car')

function getCurrentTime(){
    var current = new Date();
    return current.toLocaleTimeString()
}

function getAllSessions(req, res){
    Session.find()
    .then(session => {
        res.status(200).send(session);
    })
    .catch(err => {
        res.status(401).send(err);
    })
}

function getLastSession(req, res) {
    let userId = req.params.id

    Session.findOneAndUpdate({endTime: '', userId: userId}, {endTime: getCurrentTime()}).exec()
        .then(session => {
            session.endTime = getCurrentTime()
            updateCarAvailable(session.carId)
            createOrder(session)
            res.status(200).send(session);
        })
        .catch(err => {
            res.status(401).send(err);
        })


    User.findOneAndUpdate({_id: userId}, {activeCar: false})
    .then(() =>
     //   res.status(200).send("Succesfully updated session")
     {})
    .catch((err) => {
        res.status(401).send({ err });
    })

 
}

function updateCarAvailable(carId){
    Car.findOneAndUpdate({_id: carId}, {available: true})
    .then(() => {})
    .catch((err) => {
        res.status(401).send({ err });
    })
}

function createOrder(session){
    let amountOfKm = Math.floor(Math.random() * 10) + 1;
    Car.find({_id: session.carId}).then(data => {
        console.log(data)
        let costs = amountOfKm * data[0].price
        console.log(amountOfKm)
        console.log(data.price)
        console.log(costs)
        console.log(typeof costs)

        Order.create({
            user: session.userId,
            startLocation: session.startLocation,
            endLocation: session.endLocation,
            startTime: session.startTime,
            endTime: session.endTime,
            car: session.carId,
            drivenKm: amountOfKm,
            costs: costs
        })
    })

}

function createSession(req, res) {
    let userId = req.body.userId
    let carId = req.body.carId
    Session.create({
        userId: userId,
        carId: carId,
        startTime: getCurrentTime(),
        endTime: "",
        startLocation: req.body.startLocation,
        endLocation: req.body.endLocation
    })
        .then(() =>
            res.status(200).send("Succesfully created an session."))
        .catch((err) => {
            res.status(401).send({ err });
        })


    User.findOneAndUpdate({_id: userId}, {activeCar: true})
    .then(() => {})
    .catch((err) => {
        res.status(401).send({ err });
    })

    Car.findOneAndUpdate({_id: carId}, {available: false})
    .then(() => {})
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
    getLastSession,
    createSession,
    remove,
    getAllSessions
}