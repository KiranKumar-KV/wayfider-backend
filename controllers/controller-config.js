const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
router.use(cors());

const dbcontroller = require('../db/dbcontroller')

const {FILES_PATH} =  require('../constants/constant')

module.exports = {router, dbcontroller, FILES_PATH};