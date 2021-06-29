const express = require("express");
const router = express.Router();
const {body} = require("express-validator/check");
const authController = require("../controllers/auth");
const User = require("../models/user");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, {req}) => {
        return User.findOne({email: value}).then((user) => {
          if (user) {
            return Promise.reject("Email address already exists");
          }

          return true;
        });
      }),
    body("password").isLength({min: 5}).trim(),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

module.exports = router;
