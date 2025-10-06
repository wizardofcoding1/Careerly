// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { saveUser } = require("../controllers/userController");

router.post("/save-user", saveUser);

module.exports = router;
