import upload from "../../utils/multer.js";
import admin from "../../middleware/admin.js";
import {
  getUser,
  updateUser,
  getMe,
  getUsers,
  deleteUser,
  blockUser,
} from "../controller/userController.js";
import protect from "../../middleware/protect.js";
import express from "express";

const router = express.Router();

router
.route("/:id")
.put(upload.single("img"), protect, updateUser)
.delete(protect, admin, deleteUser)
router.get("/me", protect, getMe);
router.route("/").get(protect, admin, getUsers);
router.get('/:id', getUser)
router.get('/:id/block', protect, admin, blockUser)

export default router;
