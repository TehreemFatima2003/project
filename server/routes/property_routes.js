import express from 'express';


import {
    createProperty,
    getPropertyById,
    displayProperties,
    getPropertiesByOwnerId,
    getPropertyByCity,
    getPropertyByPrice,
    getPropertyByPurpose,
    getPropertyByType,
    markPropertyAsDone,
    removeProperty,
    updateProperty
} 
from "../controllers/property_controllers.js"

// import { encodeImagesToBase64, uploadMultiple } from '../middleware/imageMiddleware.js';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/imageMiddleware.js';


const router = express.Router();

router.patch('/markproperty/:property_id', markPropertyAsDone)

// router.post('/' , uploadMultiple , encodeImagesToBase64 ,acreateProperty);
router.post('/', upload.single('photo'), createProperty);

//search by id
router.get('/:property_id', getPropertyById);

// search by location(city)
router.get('/city/:city', getPropertyByCity);

//search by price-range
router.get('/price/price', getPropertyByPrice);

//search by purpose(buy/rent)
router.get('/purpose/:purpose', getPropertyByPurpose);

//search by property-type (house/flat)
router.get('/type/:type', getPropertyByType);

// search by owner id
router.get('/owner' , getPropertiesByOwnerId);

router.get('/', displayProperties);

router.delete('/:property_id',auth, removeProperty);

router.patch('/:property_id', auth, updateProperty);


export default router;
