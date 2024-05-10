import express from 'express'

import { registerUser, loginUser, logout, verifyUser} from '../controller/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/user/:userId/verify/:token', verifyUser)

export default router;