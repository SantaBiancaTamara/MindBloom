import Category from "../models/Category.js";
import Activity from "../models/Activity.js";
import Mood from "../models/Mood.js";
import mongoose from "mongoose";

// verification 
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message:'Error fetching categories', error:error.message});
  }
};

// verification 
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message:'Error fetching activities', error: error.message });
  }
};

// verification 
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({});
    res.status(200).json(moods);
  } catch (error) {
    console.error('Error fetching moods:', error);
    res.status(500).json({ message:'Error fetching moods', error: error.message });
  }
};

// verification 
export const getOneCategoryWithActivities = async (req, res) => {
  const { name: categoryName } = req.body;
  try {
    const categoryWithActivities = await Category.findOne({ name: categoryName }).populate('activities');
    if (!categoryWithActivities) {
      return res.status(404).json({message:'Category not found'});
    }
    res.status(200).json(categoryWithActivities);
  } catch (error) {
    console.error('Error fetching category with activities:', error);
    res.status(500).json({message:'Error fetching one category with activities', error:error.message});
  }
};

// verification 
export const getCategoryWithActivities = async (req, res) => {
  try {
    const categoryWithActivities = await Category.find({}).populate('activities');
    res.status(200).json(categoryWithActivities);
  } catch (error) {
    console.error('Error fetching categories with activities:', error);
    res.status(500).json({message:"Error fetching all categories with activities", error:error.message});
  }
};

//add a user activity
export const addUserActivity = async (req, res) => {
  const { name, categoryId } = req.body;
  const userId = req.userId;

  try {
    console.log(`categoryId:${categoryId}`);
    console.log(`name:${name}`);

    if (!categoryId) {
      return res.status(400).json({message:'Category ID is required'});
    }

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const category = await Category.findById(categoryObjectId);
    console.log(`Category found: ${category}`);
    if (!category) {
      return res.status(404).json({message:'Category not found'});
    }

    const existingActivity = await Activity.findOne({
      name,
      category: category._id,
      userId: userId
    });

    if (existingActivity) {
      return res.status(400).json({message:'Activity already exists for this user in the given category'});
    }

    //create and save in the db the user activity
    const newUserActivity = new Activity({
      name,
      category: category._id,
      userId: [userId],
      isDefault: false
    });

    const savedActivity = await newUserActivity.save();
    res.status(201).json({ message:'Activity added successfully', activity:savedActivity });
  } catch (error) {
    console.error('Error adding user activity:', error);
    res.status(500).json({ message:'Error adding user activity', error:error.message});
  }
};

//get all activities for a user
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
  } catch (error) {
    console.error('Error fetching activities for user:', error);
    res.status(500).json({message:'Error fetching activities', error:error.message});
  }
};
