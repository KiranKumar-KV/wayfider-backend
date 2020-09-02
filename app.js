const express = require('express');
const app = express();

const mall_controller = require('./controllers/mall_controller');
const role_controller = require('./controllers/role_controller');
const user_controller = require('./controllers/user_controller');
const floor_controller = require('./controllers/floor_controller');
const category_controller = require('./controllers/category_controller');
const shop_controller = require('./controllers/shop_controller');
const store_controller = require('./controllers/store_controller');
const card_controller = require('./controllers/card_controller');
const offers_controller = require('./controllers/offers_controller');
const event_controller = require('./controllers/event_controller');
const banner_controller = require('./controllers/banner_controller');
const mall_info_controller = require('./controllers/mall_info_controller');
const login_controller  = require('./controllers/login_controller');
const screen_controller = require('./controllers/screen_controller');
const device_controller = require('./controllers/device_controller');
const amenities_controller = require('./controllers/amenities_controller');

app.use('/roles', role_controller, (req,res,next) => {})
app.use('/malls', mall_controller, (req,res,next) => {})
app.use('/users', user_controller, (req,res,next) => {})
app.use('/floors', floor_controller, (req,res,next) => {})
app.use('/category', category_controller, (req,res,next) => {})
app.use('/shops', shop_controller, (req,res,next) => {})
app.use('/stores', store_controller, (req,res,next) => {})
app.use('/main-cards', card_controller, (req,res,next) => {})
app.use('/offers', offers_controller, (req,res,next) => {})
app.use('/events', event_controller, (req,res,next) => {})
app.use('/banners', banner_controller, (req,res,next) => {})
app.use('/mall-info', mall_info_controller, (req,res,next) => {})
app.use('/login', login_controller, (req,res,next) => {})
app.use('/screen', screen_controller, (req,res,next) => {})
app.use('/device', device_controller, (req,res,next) => {})
app.use('/amenities',amenities_controller, (req,res,next) => {})

module.exports = app;

