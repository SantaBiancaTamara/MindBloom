import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

// In Category schema
categorySchema.virtual('activities', {
    ref: 'Activity',
    localField: '_id',
    foreignField: 'category'
});

// Ensure you have this if using toJSON or toObject:
categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model('Category', categorySchema);


export default Category;