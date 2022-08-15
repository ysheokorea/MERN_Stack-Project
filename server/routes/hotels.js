const express = require('express');
const Hotel = require('../models/Hotel');
const createError = require('../utils/error');
const { 
    createHotel, 
    updateHotel, 
    deleteHotel, 
    getHotel, 
    getAllHotels, 
    countByCity,
    countByType, 
    getHotelRooms
    } = require('../controllers/hotel');
const { verifyAdmin }  = require('../utils/verifyToken');

const router = express.Router();

//Create 
router.post('/',verifyAdmin, createHotel)

//Update
router.put('/:id',verifyAdmin, updateHotel)

// Delete
router.delete('/:id',verifyAdmin, deleteHotel)

//Get
router.get('/find/:id', getHotel)

//Get All
router.get('/', getAllHotels)
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);


module.exports=router;