require('dotenv').config();
const express = require('express');
const taskRoute = require("./routes/task.route");
const connectDB = require("./db/db");
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/tasks', taskRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});