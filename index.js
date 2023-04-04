const express = require('express')
const cors = require("cors");
const app = express()
app.use(express.json());
app.use(cors());

const mongoose = require("./database");

const FormRoute = require("./routes/demo");

app.use(FormRoute);

app.get("/", (req, res) => res.send(`Server Running successfully.....!`));


app.listen(port=3020, () => {
    console.log(`Server running on port ${port}`)
});