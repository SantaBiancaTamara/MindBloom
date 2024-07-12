import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoute from './routes/userRoutes.js'
import protectedRoute from './routes/protectedRoute.js'
import initializeDefaults from './utils/initializeDefaultsUtils.js'

const app = express();

let corsOptions = {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://localhost:3000/ws",
      "http://localhost:8002",
    ],
  };

// middleware
app.use(express.json());
app.use(cors(corsOptions));

//setup routes
app.use('', userRoute)
app.use('', protectedRoute);


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    //Clear the categories and activities collections
  //  await Category.deleteMany({});
  //  console.log('All categories have been deleted.');
  //  await Activity.deleteMany({});
  //  console.log('All activities have been deleted.');
    await initializeDefaults(); // Initialize defaults after successful connection
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  })
  .catch(err => console.error('Could not connect to MongoDB:', err));



