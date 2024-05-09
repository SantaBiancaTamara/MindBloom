import Category from "../models/Category.js"
import Activity from "../models/Activity.js";
import Mood from "../models/Mood.js";

export const getAllCategories = async(req,res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
} catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
}
};

export const getAllActivities = async(req,res) => {
  try {
    const activities = await Activity.find({});
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
}

export const getMoods = async(req,res) => {
  try {
    const moods = await Mood.find({});
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
}

// ENDPOINT_> fetches all categories from data base and then, for each category
//            finds the associated activities
// export const getCategoryWithActivities = async (req, res) => {
//   try {
//       const categories = await Category.find({});
//       const categoryWithActivities = await Promise.all(categories.map(async category => {
//           const activities = await Activity.find({ category: category._id });
//           return { ...category._doc, activities }; // Merge category info with activities
//       }));
//       res.json(categoryWithActivities);
//   } catch (error) {
//       res.status(500).json({ message: "Error fetching categories with activities", error });
//   }
// };

//ENDPOINT-> provide a category name in the body and you will get all altivities for that cat.
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

//-> ENDPOINT-> uses mongoDB property to query categories and integrate the afferent activities -> more efficient
export const getCategoryWithActivities = async(req,res) => {
  
  try {
    const categoryWithActivities = await Category.find({}).populate('activities');
    res.json(categoryWithActivities);

  } catch (error) {
    res.status(500).json({message: "error fetching categories with activities", error});
  }
}

