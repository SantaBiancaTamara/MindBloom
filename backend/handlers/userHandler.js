import UserModel from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { tokenBlacklist } from '../utils/tokenBlacklist.js';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
  try {
    const { fullName, nickname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    user = new UserModel({ fullName, nickname, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ user });
   
  } catch (error) {
    res.status(500).send('Error in saving');
  }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).send('User not found');
        }

        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send(token);

    } catch (error) {
        res.status(500).send('Server error');
      }
}


export const logout = async(req, res) => {

  const bearerHeader = req.header('Authorization');
  const token = bearerHeader.split(' ')[1];

  tokenBlacklist.push(token);

  res.status(200).send('Logged out successfully');
}

// for verification purposes
export const getAllUsers = async (req,res) => {
  try {
    const allUsers = await UserModel.find({})
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
}
