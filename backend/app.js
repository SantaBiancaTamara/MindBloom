import express from 'express'
import connectDB from './database/connect.js'
import cors from 'cors'
import UserModel from './models/User.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import setupUserRoutes from './routes/userRoutes.js'
import userRoutes from './routes/userRoutes.js'
import protectedRoute from './routes/protectedRoute.js'
import Category from './models/Category.js'
import Activity from './models/Activity.js'
//import initializeDefaultsUtils from './utils/initializeDefaultsUtils.js';

import initializeDefaults from './utils/initializeDefaultsUtils.js'

const app = express();

let corsOptions = {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
  };

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

//Setup routes
setupUserRoutes(app); // for user i guess
//app.use('/auth', userRoutes);
app.use('', protectedRoute);


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});

// // CONNECTION SETUP ------------------------------------------------------------------------------------------------------------------

// // database connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => 
//   console.log('Connected to MongoDB'))

// .catch(err => console.error('Could not connect to MongoDB', err));


// // server connection
// const port = process.env.PORT || 8080;
// const start = async () => {
//     try {
//        // await connectDB(process.env.MONGO_URI);
//         app.listen(port, () => console.log(`Server is listening on port ${port}...`));
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//     }
// };


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    // Clear the categories and activities collections
    await Category.deleteMany({});
    console.log('All categories have been deleted.');
    await Activity.deleteMany({});
    console.log('All activities have been deleted.');
    await initializeDefaults(); // Initialize defaults after successful connection
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  })
  .catch(err => console.error('Could not connect to MongoDB:', err));



