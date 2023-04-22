const express = require("express");

const router = express.Router();

const Workouts = require("../models/workOutModel");

router.get("/", (req, res) => {
  res.json({ message: "GET all workouts" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "Get signle workout" });
});

router.post("/", async (req, res) => {
    const { title, reps, load } = req.body;
//   console.log(req.body);
  try {
    const workout = await Workouts.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
  res.json({ message: "Create a new workout" });
});
router.delete("/:id", (req, res) => {
  res.json({ message: "delete a workout" });
});
router.put("/:id", (req, res) => {
  res.json({ message: "update a workout" });
});

module.exports = router;
