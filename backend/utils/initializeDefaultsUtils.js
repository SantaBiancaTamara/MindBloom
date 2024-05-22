import mongoose from 'mongoose';
import defaultConfig from '../config/defaultsConfig.js';
import Mood from '../models/Mood.js';
import Category from '../models/Category.js';
import Activity from '../models/Activity.js';

async function initializeDefaults() {
    // Populate moods
    for (const mood of defaultConfig.moods) {
        const moodExists = await Mood.findOne({ name: mood.name });
        if (!moodExists) {
            await new Mood(mood).save();
        }
    }

    // Populate categories and keep track of their IDs
    const categoryIds = {};
    for (const category of defaultConfig.categories) {
        let cat = await Category.findOne({ name: category.name });
        if (!cat) {
            cat = await new Category(category).save();
        }
        categoryIds[category.name] = cat._id;
    }

  // Populate activities using the category ObjectIds
  for (const activity of defaultConfig.activities) {
    await Activity.findOneAndUpdate(
        { name: activity.name },
        {
            $setOnInsert: {
                ...activity,
                category: categoryIds[activity.category], // Replace category name with ObjectId
            }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

   // console.log(activity.name);

}

console.log('Defaults initialized');
}

export default initializeDefaults;