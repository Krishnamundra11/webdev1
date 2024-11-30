const express = require("express");

const { registerUser, getAllRegistrations } = require("../controllers/registrationController");
const { createClub, getAllClubs } = require("../controllers/clubController");

const router = express.Router();

// Registration Routes
router.post("/register", registerUser);
router.get("/registrations", getAllRegistrations);

// Club Routes
router.post("/createClub", createClub);
router.get("/getClubs", getAllClubs);

module.exports = router;
