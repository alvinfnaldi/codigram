const userRoute = require("express").Router();
const { getUsers,  loginUser, registerUser, updateUser, deleteUser, getDetailUser, deleteAllUsers, userCount } = require("../controllers/userController");
const { checkToken } = require("../middleware/auth")

userRoute.get("/", getUsers);
userRoute.get("/count", userCount);
userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/delete/:id", deleteUser);
userRoute.get("/details/:id", getDetailUser);
userRoute.delete("/", checkToken, deleteAllUsers);

module.exports = userRoute;
