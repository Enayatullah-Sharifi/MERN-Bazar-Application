import Item from "../model/Item.js";
import asyncHandler from "express-async-handler";
import {addItemFormValidation} from '../../utils/formValidation.js'

// @desc  Create an item
// @route POST  /api/items/
// @access  Private
export const addItem = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.isBlocked) {
    res.status(401);
    throw new Error("Access denied, You are blocked by admin");
  }

  const img = req.file.filename;
  const { name, price, category, qty, description, phone_number } = req.body;
  const { valid, errors } = addItemFormValidation(name, price, category, phone_number);

  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors));
  }

  const item = await Item.create({
    name,
    price,
    category,
    qty,
    description,
    img,
    user,
    phone_number
  });

  if (!item) {
    res.status(400);
    throw new Error("Item not created successfully!");
  }

  res.status(201).json({
    success: true,
    message: "Item created successfully",
    data: item,
  });
});

// @desc  Get all stuffs
// @route   GET   /api/items
// @access  Public
export const getItems = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  
  const limit = parseInt(req.query.limit) || 12;
  const page = parseInt(req.query.page) || 1;
  

  const query = {};
  if (category) {
    query.category = category;
  }
  if (search) {
    query.name = {$regex: search, $options: 'i'}
  }

  // pagination
  const items = await Item.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  // const totalCount = await Item.countDocuments();

  if (!items) {
    res.status(404);
    throw new Error("No item found!");
  }

  res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
});

// @desc  Get single user's items
// @route   GET   /api/items/:userId
// @access  Public
export const getUserItems = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.isBlocked) {
    res.status(401);
    throw new Error("Access denied, You are blocked by admin");
  }

  const items = await Item.find({ user: user._id }).populate({
    path: "user",
    select: "username",
  });

  if (!items) {
    res.status(404);
    throw new Error(`No Items found`);
  }

  res.status(200).json({
    success: true,
    data: items,
  });
});

// @desc    Update an Stuff
// @route   PUT   /api/items/:id
// @access  Private
export const updateItem = asyncHandler(async (req, res) => {
  const user = req.user;
  const filename = req.file?.filename;
  const { name, price, category, qty, description, phone_number } = req.body;

  let item = await Item.findOne({ _id: req.params.id });

  if (!item) {
    res.status(404);
    throw new Error(`No item found`);
  }

  if (user._id.toString() !== item.user.toString() && user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied");
  }

  item = await Item.findByIdAndUpdate(
    item._id,
    {
      $set: {
        name: name ? name : item.name,
        price: price ? price : item.price,
        category: category ? category : item.category,
        qty: qty ? qty : item.qty,
        description: description ? description : item.description,
        phone_number: phone_number ? phone_number : item.phone_number,
        img: filename ? filename : item.img,
      },
    },
    {
      new: true,
    }
  );

  if (!item) {
    res.status(400);
    throw new Error(`Item not updated successfully`);
  }

  res.status(201).json({
    success: true,
    message: "Item updated successfully",
    data: item,
  });
});

// @desc  Delete an item
// @route   Delete  /api/items/:id
// @access  Private
export const deleteItem = asyncHandler(async (req, res) => {
  const user = req.user;

  let item = await Item.findOne({ _id: req.params.id });
  if (!item) {
    res.status(404);
    throw new Error(`No item found`);
  }

  if (user._id.toString() !== item.user.toString() && user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied");
  }

  item = await item.deleteOne();
  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
    data: item,
  });
});

// @desc  Get an item
// @route GET /api/items/single/:id
// @route Private
export const getSingleItemById = asyncHandler(async (req, res) => {
  let item = await Item.findOne({ _id: req.params.id });
  if (!item) {
    res.status(404);
    throw new Error(`No item found`);
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});
