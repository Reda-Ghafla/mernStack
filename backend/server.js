require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const workOutRouter = require("./routes/workout");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Connected on DB & server is running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));

//Midelware
app.use(express.json())
// app.use((req, res, next) => {
//   console.log(req.path, req.params);
//   next();
// });

//routes
app.use("/api/workouts", workOutRouter);
