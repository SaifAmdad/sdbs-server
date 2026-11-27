const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
const { joseKeyUrl } = require("../secrets");

const isLogin = async (req, res, next) => {
  try {
    const token = req.headers?.auth;

    const JWTS = createRemoteJWKSet(new URL(joseKeyUrl));
    const { payload } = await jwtVerify(token, JWTS, {});

    if (!payload) {
      return res.status(300).send({
        message: "not verified",
      });
    }
    req.userId = payload.id;
    req.user = payload.name;
    req.role = payload.role;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth server error",
    });
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const role = req.role;
    if (role !== "admin") {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};
const isAccountant = async (req, res, next) => {
  try {
    const role = req.role;
    if (role !== "admin" || role !== "accountant") {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

module.exports = { isAdmin, isAccountant, isLogin };
