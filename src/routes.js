var express = require('express');
var route = express();

// import controller
const controller = require('./Controllers/controller')
const user = require('./Controllers/userController')
const vehicle = require('./Controllers/vehicleController')

//parkinglot
route.get('/startMonth',controller.startMonth);
route.post('/register', controller.register);
route.get('/registerExit',controller.registerExit);
route.get('/pago',controller.pago);
route.get('/listRegister', controller.list);
route.post('/deleteRegister', controller.delete);
route.put('/updateRegister', controller.update);
route.get('/getRegister', controller.get);

// vehicles
route.post('/create_official',vehicle.create_official);
route.post('/create_resident/',vehicle.create_resident);
route.get('/listVehicle', vehicle.list);
route.post('/deleteVehicle', vehicle.delete);
route.put('/updateVehicle', vehicle.update);
route.get('/getVehicle', vehicle.get);

//users
route.post('/singup', user.singup);
route.post('/login', user.login);
route.get('/listUser', user.list);
route.post('/deleteUser', user.delete);
route.put('/updateUser', user.update);
route.get('/getUser', user.get);



module.exports = route;