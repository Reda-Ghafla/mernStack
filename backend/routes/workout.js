const express = require("express");

const router = express.Router();

const Workouts = require("../models/workOutModel");

router.get("/", async (req, res) => {
  try {
    const getWorkouts = await Workouts.find({}).sort({ createdAt: -1 });
    res.status(200).json(getWorkouts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleWork = await Workouts.findById({ _id: id });
    res.status(200).json(getSingleWork);
  } catch (error) {
    res.json({ messge: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  //   console.log(req.body);
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  try {
    const workout = await Workouts.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
  // return res.json({ message: "Create a new workout" });
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteWworkout = await Workouts.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteWworkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;

  try {
    const updateWorkout = await Workouts.findByIdAndUpdate(
      { _id: id },
      { title, reps, load },
      { new: true }
    );
    res.status(200).json(updateWorkout);
  } catch (error) {
    res.status(400).json({ message: "Deleted" });
  }
});

module.exports = router;
