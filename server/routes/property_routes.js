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
    removeProperty,
    updateProperty
} 
from "../controllers/property_controllers.js"

import { encodeImagesToBase64, uploadMultiple } from '../middleware/imageMiddleware.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();

// router.post('/' , uploadMultiple , encodeImagesToBase64 ,acreateProperty);
router.post('/' , auth , uploadMultiple , encodeImagesToBase64  ,createProperty);

// search by id
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
router.get('/owner/:ownerId' , getPropertiesByOwnerId);

router.get('/', displayProperties);

router.delete('/:property_id',auth, removeProperty);

router.patch('/:property_id', auth , uploadMultiple , encodeImagesToBase64, updateProperty);


export default router;
