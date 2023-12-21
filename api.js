const express = require('express');
const api = express.Router();
const SchemaModel = require('./models/modelschema');
const Acellor_routes_details = require('./routesfolder/user_register_routes');
const admin_access_for_signup = require ('./routesfolder/admin_acess_signup');
const programmeRoutes = require('./routesfolder/admin_shedule_programme');
const userauthenticationroutes = require('./routesfolder/user-authentication')
const userprogrammeroutes = require('./routesfolder/userviewprogramm-routes')
const event = require('./routesfolder/Event-routes')
const count = require ('./routesfolder/count')

api.use(express.static('public'))
api.use(express.urlencoded({ extended: true }));



api.post('/register', Acellor_routes_details.create);
api.use('/adminapi',count);
api.use('/adminapi',admin_access_for_signup );
api.use('/eventssapi', event);
api.use('/adminapi' , event)


api.use('/programme', programmeRoutes);
api.use(userauthenticationroutes);
api.use('/user',userprogrammeroutes)


module.exports = api;

