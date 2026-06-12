const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authcontroller");

router.get("/test", (req, res) => {
  res.json({ message: "Auth Route Working" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;