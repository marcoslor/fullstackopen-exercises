const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json(error);
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json(error);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json(error);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = request.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    response.json(updatedBlog);
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = blogsRouter;