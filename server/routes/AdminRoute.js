import express from 'express';

// import { login, signUpAdmin } from '../controllers/AdminContoller.js';
import { login, viewPendingProperty,approvePendingProperty, rejectPendingProperty } from '../controllers/AdminController.js';

const router=express.Router();


//router.post('/signup', signUpAdmin)
router.post('/login',login)
router.get('/view_pending',viewPendingProperty)
router.patch('/approve_pending/:propertyId', approvePendingProperty)
router.patch('/reject_pending/:propertyId', rejectPendingProperty)




export default router;