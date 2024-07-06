import mongoose from 'mongoose';
import defaultConfig from '../config/defaultsConfig.js';
import Mood from '../models/Mood.js';
import Category from '../models/Category.js';
import Activity from '../models/Activity.js';

async function initializeDefaults() {
    try {
        //moods
        for (const mood of defaultConfig.moods) {
            const moodExists = await Mood.findOne({ name: mood.name });
            if (!moodExists) {
                await new Mood(mood).save();
            }
        }
        //categories
        const categoryIds = {};
        for (const category of defaultConfig.categories) {
            const existingCategory = await Category.findOne({ name: category.name });
            if (!existingCategory) {
                const newCategory = await new Category(category).save();
                categoryIds[category.name] = newCategory._id;
            } else {
                categoryIds[category.name] = existingCategory._id;
            }
        }
        //activities
        for (const activity of defaultConfig.activities) {
            const activityExists = await Activity.findOne({ name: activity.name });
            if (!activityExists) {
                const newActivity = {
                    ...activity,
                    category: categoryIds[activity.category], 
                };
                await new Activity(newActivity).save();
            }
        }

        console.log('defaults are initialized');
    } catch (error) {
        console.error('error initializing defaults:', error);
    }
}

export default initializeDefaults;
