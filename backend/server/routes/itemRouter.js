import express from "express";
import protect from "../../middleware/protect.js";
import {
  addItem,
  deleteItem,
  getUserItems,
  getItems,
  updateItem,
  getSingleItemById,
} from "../controller/itemController.js";
const router = express.Router();
import upload from "../../utils/multer.js";

router.route("/").post(protect, upload.single("img"), addItem).get(getItems);
router
  .route("/:id")
  .get(protect, getUserItems)
  .put(protect, upload.single("img"), updateItem)
  .delete(protect, deleteItem);
router.get("/single/:id", getSingleItemById);

export default router;
