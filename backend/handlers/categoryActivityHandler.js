import Category from "../models/Category.js"
import Activity from "../models/Activity.js";
import Mood from "../models/Mood.js";
import mongoose from "mongoose";

//for verification
export const getAllCategories = async(req,res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
} catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
}
};

//for verification
export const getAllActivities = async(req,res) => {
  try {
    const activities = await Activity.find({});
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
}

//for verification
export const getMoods = async(req,res) => {
  try {
    const moods = await Mood.find({});
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
}


//for verification 
export const getOneCategoryWithActivities = async (req, res) => {
  console.log(req.params.categoryName); // Log the category name to debug
  const { name: categoryName } = req.body;
  try {
    const categoryWithActivities = await Category.findOne({ name: categoryName }).populate('activities');
    if (!categoryWithActivities) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(categoryWithActivities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category with activities", error });
  }
};

//for verification 
export const getCategoryWithActivities = async(req,res) => {
  
  try {
    const categoryWithActivities = await Category.find({}).populate('activities');
    res.json(categoryWithActivities);

  } catch (error) {
    res.status(500).json({message: "error fetching categories with activities", error});
  }
}


export const addUserActivity = async (req, res) => {
  const { name, categoryId } = req.body;
  const userId = req.userId;

  try {
    console.log(`Received categoryId: ${categoryId}`); // Debugging line
    console.log(`Received name: ${name}`); // Debugging line

    if (!categoryId) {
      return res.status(400).json({ error:'Category ID is required' });
    }

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId); 

    const category = await Category.findById(categoryObjectId);
    console.log(`Category found: ${category}`); 
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const existingActivity = await Activity.findOne({
      name,
      category: category._id,
      userId: userId
    });

    if (existingActivity) {
      return res.status(400).json({ error: 'Activity already exists for this user in the given category' });
    }

    // the new user activity 
    const newUserActivity = new Activity({
      name,
      category: category._id,
      userId: [userId],
      isDefault: false
    });

    const savedActivity = await newUserActivity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    console.error(`Error: ${err.message}`); // Debugging line
    res.status(400).json({ error: err.message });
  }
};

//user to display the activities in frontend for complete entry
export const getAllActivitiesForUser = async (req, res) => {
  const userId = req.userId;

  try {

    const categories = await Category.find({});

    const activities = await Activity.find({
      $or: [{ userId: null }, { userId: userId }]
    }).populate('category');

    const categoryWithAllActivities = categories.map(category => {
      const categoryObject = category.toObject();
      categoryObject.activities = activities.filter(activity => activity.category._id.toString() === category._id.toString());
      return categoryObject;
    });

    res.status(200).json(categoryWithAllActivities);
  } catch (err) {
    res.status(500).json({ message: "Error fetching activities", error: err.message });
  }
};

