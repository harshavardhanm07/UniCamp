const Router = require("express").Router;
const blogRoute = Router();
const { getBlog,getBlogs,createBlog,editBlog,deleteBlog,likeBlog,commentBlog } = require("../controllers/blog.js");

blogRoute.get("/", getBlogs);
blogRoute.get('/:id',getBlog);
blogRoute.post("/create", createBlog);
blogRoute.post("/edit/:id", editBlog);
blogRoute.post("/delete/:id", deleteBlog);
blogRoute.post("/like/:id", likeBlog);
// blogRoute.put("/:id/comment", commentBlog);

module.exports = blogRoute;