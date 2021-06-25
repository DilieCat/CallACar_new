const CarController = require('../src/controllers/car_controller');

module.exports = (app) => {
    //Car routes

    //get all cars
    app.get('/api/cars/', CarController.getAll);

    app.get('/api/cars/available', CarController.getAllAvailable)
    //create a car
    app.post('/api/cars/', CarController.createCar);
    //remove a car from the database with it's id
    app.delete('/api/cars/:id', CarController.remove);
};