import express from 'express';


import {
    createProperty,
    getPropertyById,
    displayProperties,
    
    getPropertyByCity,
    getPropertyByPrice,
    getPropertyByPurpose,
    getPropertyByType,
    markPropertyAsDone,
    removeProperty,
    updateProperty,
    createPropertyAsDraft,
    getPropertyByStatus,
    getDraftProperty,
    submitDraftProperty,
    deleteProperty
} 
from "../controllers/property_controllers.js"

// import { encodeImagesToBase64, uploadMultiple } from '../middleware/imageMiddleware.js';
import { auth } from '../middleware/auth.js';
import upload from './../middleware/imageMiddleware.js';


const router = express.Router();

router.post('/add', createProperty);

router.post('/adddraft', createPropertyAsDraft);

router.patch('/markproperty/:property_id', markPropertyAsDone)

router.get('/owner', getPropertyByStatus)

router.get('/drafts/:ownerId', getDraftProperty)

router.patch('/postdraft/:property_id', submitDraftProperty)

router.patch('/update', updateProperty);

router.delete('/delete/:property_id', deleteProperty);







// router.post('/' , uploadMultiple , encodeImagesToBase64 ,acreateProperty);

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
//router.get('/owner' , getPropertiesByOwnerId);

router.get('/', displayProperties);





export default router;
