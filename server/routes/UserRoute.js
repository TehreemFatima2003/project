import express from 'express'
import { addProperty, addPropertyInSavedProperty, getOwnerName, getUserById, getUsers, login, removePostedProperty, removeSavedProperty, signUp, viewPostedProperty, viewSavedProperty  } from '../controllers/UserController.js';
import { auth } from '../middleware/auth.js';


const router=express.Router();

router.get('/',getUsers);

router.post('/signup',signUp);

router.post('/login',login);

//router.get('/:id', getUserById);

router.post('/savedproperty', addPropertyInSavedProperty);

router.get('/:userId', getOwnerName);

router.get('/savedproperty/:userId',viewSavedProperty)

router.delete('/savedproperty',  removeSavedProperty)

router.get('/postedproperty', auth , viewPostedProperty);

router.delete('/postedproperty/:propertyId', auth , removePostedProperty);

router.post('/postedproperty/:propertyId', auth, addProperty);


export default router;