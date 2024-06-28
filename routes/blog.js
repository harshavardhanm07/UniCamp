const Router = require("express").Router;
const blogRoute = Router();
const { getBlog,getBlogs,createBlog,editBlog,deleteBlog,likeBlog,commentBlog } = require("../controllers/blog.js");
const  ensureAuthenticated  = require("../middleware/ensureAuthenticated.js");

blogRoute.get("/",ensureAuthenticated, getBlogs);
blogRoute.get('/:id',ensureAuthenticated,getBlog);
blogRoute.post("/create", ensureAuthenticated,createBlog);
blogRoute.post("/edit/:id",ensureAuthenticated, editBlog);
blogRoute.post("/delete/:id",ensureAuthenticated, deleteBlog);
blogRoute.post("/like/:id",ensureAuthenticated, likeBlog);
// blogRoute.put("/:id/comment", commentBlog);

module.exports = blogRoute;