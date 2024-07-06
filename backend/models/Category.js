import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

categorySchema.virtual('activities', {
    ref: 'Activity',
    localField: '_id',
    foreignField: 'category'
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model('Category', categorySchema);


export default Category;

