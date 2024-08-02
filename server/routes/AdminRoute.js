import express from 'express';

// import { login, signUpAdmin } from '../controllers/AdminContoller.js';
import { login, viewPendingProperty, signUpAdmin, approvePendingProperty, rejectPendingProperty } from '../controllers/AdminContoller.js';

const router=express.Router();


router.post('/signup', signUpAdmin)
router.post('/login',login)
router.get('/viewpending',viewPendingProperty)
router.post('/approvepending/:propertyId', approvePendingProperty)
router.post('/rejectpending/:propertyId', rejectPendingProperty)




export default router;