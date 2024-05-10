import express from 'express'
import adminRoute from '../../middleware/admin.js';
import protect from '../../middleware/protect.js'
import { getAllItems, getItemsPerDay } from '../controller/adminController.js';

const router = express.Router()

router.route('/items').get(protect, adminRoute, getAllItems)
router.get('/items/perday', protect, adminRoute, getItemsPerDay)

export default router;