const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./models/db');
const userRoutes = require ('./routes/userRoutes');
const PORT = process.env.PORT || 8080;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re-sync")
});

app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
