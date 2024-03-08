const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option for new MongoDB driver
  })
  .then(() => {
    console.log('MongoDB connected');
    
    // Start the Express app after successful MongoDB connection
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
