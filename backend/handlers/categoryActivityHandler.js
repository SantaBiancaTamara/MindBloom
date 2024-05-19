import Category from "../models/Category.js"
import Activity from "../models/Activity.js";
import Mood from "../models/Mood.js";
import UserActivity from "../models/UserActivity.js";

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

// export const addActivity = async (req, res) => {
//   const { categoryId, name } = req.body;
//   try {
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     const newActivity = new Activity({
//       name,
//       category: categoryId
//     });
//     await newActivity.save();
//     // Optionally, push this activity into the category's activity list if needed
//     category.activities.push(newActivity);
//     await category.save();
//     res.status(201).json(newActivity);
//   } catch (error) {
//     console.log(error);  // This will log to your server's console
//     res.status(500).json({ message: "Failed to add activity", error: error.message });
//   }
// };


export const addUserActivity = async(req,res) => {

  const {name, category, description, moodImpact, additionalAttributes} = req.body;
  const userId = req.userId

  try{
    const newUserActivity = new UserActivity({
      user: userId,
      name,
      category,
      description,
      moodImpact,
      additionalAttributes
    });

    const savedActivity = await newUserActivity.save();
    res.status(201).json(savedActivity);
  }catch (err){
    res.status(400).json({error: err.message});
  }


}

export const getAllUserActivity = async(req,res) => {

  const userId = req.userId;

    try {
        const userActivities = await UserActivity.find({ user: userId });
        res.status(200).json(userActivities);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getAllActivitiesForUser = async (req, res) => {
  const userId = req.userId;

  try {
      // Fetch predefined activities
      const categories = await Category.find({}).populate('activities');

      // Fetch user-specific activities
      const userActivities = await UserActivity.find({ user: userId });

      // Combine activities
      const categoryWithAllActivities = categories.map(category => {
          const categoryObject = category.toObject();
          categoryObject.activities = categoryObject.activities.concat(
              userActivities.filter(activity => activity.category.toString() === category._id.toString())
          );
          return categoryObject;
      });

      res.status(200).json(categoryWithAllActivities);
  } catch (err) {
      res.status(500).json({ message: "Error fetching activities", error: err.message });
  }
};
