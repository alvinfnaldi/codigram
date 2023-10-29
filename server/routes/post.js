const postRoute = require("express").Router();
const { getPosts, addPost, deletePost, updatePost, getDetailPost, deleteAllPosts } = require("../controllers/postController");
const { checkToken } = require("../middleware/auth");

postRoute.get("/", getPosts);
postRoute.post("/add", addPost);
postRoute.delete("/delete/:id", deletePost);
postRoute.put("/update/:id", updatePost);
postRoute.get("/details/:id", getDetailPost);
postRoute.delete("/", checkToken, deleteAllPosts)

module.exports = postRoute;
