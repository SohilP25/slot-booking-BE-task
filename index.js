const express = require('express');
const mongoose = require('mongoose');
const wardenRoutes = require('./routes/wardenRoutes');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Console log when the database is connected
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB successfully!");
});

app.use(express.json());
app.use('/warden', wardenRoutes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
