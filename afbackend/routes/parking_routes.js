const ParkingController = require('../src/controllers/parking_controller');

module.exports = (app) => {
    //Parking facility routes

    //get all parking facilities
    app.get('/api/parking/', ParkingController.getAll);
    //create a facility
    app.post('/api/parking/', ParkingController.createParkingfacility);
    //remove a facility from the database with it's id
    app.delete('/api/parking/:id', ParkingController.remove);
};