const { PrismaClient } = require("@prisma/client");
const UserModel = require("../models/userModel");
const prisma = new PrismaClient();

// Create a new user --------------------

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const exist = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true, name: true },
    });
    console.log(exist);

    if (exist) {
      return res.status(400).send({
        success: false,
        message: "user already exist",
        user: exist,
      });
    }
    const createdUser = await prisma.user.create({
      data: user,
    });
    console.log("in try error", createUser);
    res.status(200).send({
      success: true,
      message: "User created",
      user,
      createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

// Get all users By Admin ------------------------

const getAllUsersByAdmin = async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };

    const users = await UserModel.find(filter, { password: 0 })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalUser = await UserModel.find(filter, {
      password: 0,
    }).countDocuments();

    if (!totalUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const totalPage = Math.ceil(totalUser / limit);

    res.status(200).send({
      message: "Users were returned successfully !",
      users,
      pagination: {
        totalUser,
        totalPage,
        currentPage: page,
        prevPage: page - 1 <= 0 ? null : page - 1,
        nextPage: page + 1 >= totalPage ? page + 1 : null,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

// Get all users ------------------------

const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      role: { $ne: "user" },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };

    const users = await UserModel.find(filter, { password: 0 })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalUser = await UserModel.find(filter, {
      password: 0,
    }).countDocuments();

    console.log(totalUser);

    if (!totalUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const totalPage = Math.ceil(totalUser / limit);

    res.status(200).send({
      message: "Users were returned successfully !",
      users,
      pagination: {
        totalUser,
        totalPage,
        currentPage: page,
        prevPage: page - 1 <= 0 ? null : page - 1,
        nextPage: page + 1 >= totalPage ? page + 1 : null,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

// get users by role ------------===================
const getUsersByRole = async () => {
  try {
    const role = req.query.role || "member";
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const filter = {
      role: { $eq: role },
    };

    const users = await UserModel.find(filter, { password: 0 })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalUser = await UserModel.find(filter, {
      password: 0,
    }).countDocuments();

    console.log(totalUser);

    if (!totalUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const totalPage = Math.ceil(totalUser / limit);

    res.status(200).send({
      message: "Users were returned successfully !",
      users,
      pagination: {
        totalUser,
        totalPage,
        currentPage: page,
        prevPage: page - 1 <= 0 ? null : page - 1,
        nextPage: page + 1 >= totalPage ? page + 1 : null,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

// change user role -----------------=================
const changeUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const role = req.body.role || "member";
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this ID",
      });
    }
    if (
      role !== "user" &&
      role !== "member" &&
      role !== "accountant" &&
      role !== "admin"
    ) {
      return res.status(400).send({
        success: false,
        message: `${role}, Role cannot be assigned!`,
      });
    }
    console.log(user._id);
    const updatedRole = await UserModel.findByIdAndUpdate(user._id, { role });

    res.status(200).send({
      success: true,
      message: "Role has been updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

// Delete users by role (user)----------=================
const deleteUsersByRole = async () => {
  // pass
};

// Update user image ----------======================
const updateUserImage = async (req, res) => {
  try {
    const image = req.file?.path;
    const userId = req.params.id;
    console.log(image);
    res.status(200).send({
      success: true,
      message: "Image updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

// ---------------------------------------------------------------------

// Get user by ID --------================
const getUserById = async (req, res) => {
  // pass
};

module.exports = {
  getAllUsers,
  getAllUsersByAdmin,
  changeUserRole,
  updateUserImage,
  createUser,
};
