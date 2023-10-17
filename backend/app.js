// app.js

const express = require('express');
const app = express();
const { sequelize } = require('./models')
const userRoutes = require('./routes');
app.use(express.json())
const cors = require('cors')

// Import and use the user routes
app.use(cors())
app.use(userRoutes);

// Other middleware and configurations...

const PORT = process.env.PORT || 4000;
app.listen(PORT,async () => {
    await sequelize.authenticate()
  console.log(`Server is running on port ${PORT}`);
});
