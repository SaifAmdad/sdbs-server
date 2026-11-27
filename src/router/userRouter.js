const express = require("express");
const {
  getAllUsers,
  getAllUsersByAdmin,
  changeUserRole,
  updateUserImage,
  createUser,
} = require("../controller/userController");
const multer = require("multer");
const upload = multer();

const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users-admin", getAllUsersByAdmin);
userRouter.patch("/user/:id", changeUserRole);
userRouter.patch("/user-image/:id", upload.single("image"), updateUserImage);

module.exports = userRouter;
