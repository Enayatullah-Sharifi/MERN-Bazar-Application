import asyncHandler from "express-async-handler";
import Item from "../model/Item.js";

// @desc    Get all items
// @route   GET /api/admin/items
// @access  Private/admin
export const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});
  if (!items) {
    res.status(404);
    throw new Error("No item found");
  }

  res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
});

// @desc    Get items per day
// @route   GET /api/admin/items/perday
// @access  Private/admin
export const getItemsPerDay = asyncHandler(async (req, res) => {
  const result = await Item.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]).sort({_id: {year: -1,month: -1, day: -1 }});

  if (!result) {
    res.status(404);
    throw new Error("No item found");
  }

  res.status(200).json({
    success: true,
    message: "items per day",
    data: result,
  });
});
