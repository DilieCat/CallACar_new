const SessionController = require('../src/controllers/session_controller');

module.exports = (app) => {
    //Session routes

    //get all session
    app.post('/api/session/endSession/:id', SessionController.getLastSession);
    //create a session
    app.post('/api/session/', SessionController.createSession);
    app.get('/api/session/', SessionController.getAllSessions);

    //app.delete('/api/cars/:id', CarController.remove);
};