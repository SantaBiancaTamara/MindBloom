import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },
    nickname: {
        type:String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;