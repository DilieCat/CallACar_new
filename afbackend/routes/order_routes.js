const OrderController = require('../src/controllers/order_controller');

module.exports = (app) => {
    //Order routes
    app.get('/api/order/:id', OrderController.getUserOrder);
    //get all orders
    app.get('/api/order/', OrderController.getAll);
    //create a order
    app.post('/api/order/', OrderController.createOrder);
    //remove a order from the database with it's id
    app.delete('/api/order/:id', OrderController.remove);
};