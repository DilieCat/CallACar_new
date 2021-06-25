const express = require('express');
const bodyParser= require('body-parser')
const cors = require('cors');
var mongodb = require('./config/mongodb_connections');
const app = express();

// Set up CORS
app.use(cors({
  origin: true, // "true" will copy the domain of the request back
                // to the reply. If you need more control than this
                // use a function.

  credentials: true, // This MUST be "true" if your endpoint is
                     // authenticated via either a session cookie
                     // or Authorization header. Otherwise the
                     // browser will block the response.

  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                         // pre-flight OPTIONS requests
}));


app.use(bodyParser.json());

const userroutes = require('./routes/user_routes');
const carRoutes = require('./routes/car_routes')
const orderRoutes = require('./routes/order_routes')
const sessionRoutes = require('./routes/session_routes')

//enabled routes
userroutes(app)
carRoutes(app)
orderRoutes(app)
sessionRoutes(app)

//app.use('/car', carRoutes)
//disabled routes
//none

mongodb.createDevConnection();

app.listen(process.env.PORT || 3000, () => {
    console.log('App is ready for requests.')
  })
  .on('error', (error) => {
    console.warn('Warning', error.toString());
});

module.exports = app;