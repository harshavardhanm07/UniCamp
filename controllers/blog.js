const { ObjectId } = require("mongodb");
const Blog = require("../db.js").collection("Blog");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().toArray();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createBlog = async (req, res) => {
  // const { title, content,author } = req.body;
  console.log(req.body);
  const { title, content,category,image } = req.body;

  try {
    const newBlog = {
      title,
      content,
      // author,
      category,
      createdAt: new Date(),
      likes: [],
      comments: []
    };

    const result = await Blog.insertOne(newBlog);

    console.log("Blog created with ID:", result.insertedId);

    const createdBlog = await Blog.findOne({ _id: result.insertedId });

    res.status(201).json(createdBlog);
  } catch (err) {
    console.error("Error creating blog:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.editBlog = async (req, res) => {
  const { title, content,category } = req.body;
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedBlog = {
      $set: { title, content, category },
    };

    await Blog.updateOne({ _id: new ObjectId(id) }, updatedBlog);
    res.status(200).json({ message: "Blog updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Blog.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Blog removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.likeBlog = async (req, res) => {
  const { id } = req.params;
  // const userId = req.user.id;
  const userId = req.body.id;
  try {
    // Find the blog by ID
    const blog = await Blog.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user has already liked the blog
    if (blog.likes.some((like) => like.equals(new ObjectId(userId)))) {
      return res.status(400).json({ message: "Blog already liked" });
    }

    // Add user ID to likes array
    const updatedBlog = await Blog.updateOne({ _id: new ObjectId(id) }, { $push: { likes: new ObjectId(userId) } });
    res.status(200).json({ message: "Blog liked" });
  } catch (err) {
    console.error("Error liking blog:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.commentBlog = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Please provide content for the comment" });
  }

  try {
    // Find the blog by ID
    const blog = await Blog.findOne({ _id:new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Create a new comment
    const newComment = {
      user: ObjectId(userId),
      content,
      date: new Date(),
    };

    // Add the new comment to the comments array
    const updatedBlog = await Blog.updateOne({ _id: new ObjectId(id) }, { $push: { comments: newComment } });

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (err) {
    console.error("Error adding comment:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findOne({ _id: new ObjectId(id) });
    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};