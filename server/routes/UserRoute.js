import express from 'express'
import { addProperty, addPropertyInSavedProperty, getUserById, getUsers, login, removePostedProperty, removeSavedProperty, signUp, viewPostedProperty, viewSavedProperty  } from '../controllers/UserController.js';
import { auth } from '../middleware/auth.js';


const router=express.Router();

router.get('/',getUsers);

router.post('/signup',signUp);

router.post('/login',login);

//router.get('/:id', getUserById);

router.post('/savedproperty/:propertyId',auth, addPropertyInSavedProperty);

router.get('/savedproperty',auth,viewSavedProperty)

router.delete('/savedproperty/:propertyId', auth, removeSavedProperty)

router.get('/postedproperty', auth , viewPostedProperty);

router.delete('/postedproperty/:propertyId', auth , removePostedProperty);

router.post('/postedproperty/:propertyId', auth, addProperty);


export default router;