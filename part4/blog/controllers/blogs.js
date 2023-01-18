const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

const validateFields = (req, res, next) => {
  const validFields = ["title", "author", "url", "likes", ""];

  // Check that no invalid fields are present
  const invalidFields = Object.keys(req.body).filter(
    (field) => !validFields.includes(field)
  );
  if (invalidFields.length > 0) {
    return res.status(422).json({
      error: `Blog post must only contain the following fields: ${validFields.join(", ")}.`,
    });
  }
  next();
};

blogsRouter.get("/", async (request, response) => {
  const user = request.user;

  const blogs = await Blog.find({user: user.id }).populate("user", { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;
  const body = request.body;

  const savedBlog = await (new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user: user.id,
  })).save();

  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const user = request.user;

  const blog = await Blog.findById(id);

  if (blog && blog.user.toString() === user.id.toString()) {
    response.json(blog);
    return;
  }

  response.status(404).end();
});

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const user = request.user;

  const blog = await Blog.findById(id);

  if (blog && blog.user.toString() == user.id.toString()) {
    await Blog.findByIdAndDelete(id);
  }

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = request.body;
  const user = request.user;

  const blogToUpdate = await Blog.findById(id);

  if (blogToUpdate && blogToUpdate.user.toString() === user.id.toString()) {
    const updated = await Blog.findByIdAndUpdate(id, blog, { new: true });
    response.json(updated);
  } else {
    response.status(400).end();
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const comment = request.body.comment;

  const blog = await Blog.findById(id);

  if (blog) {
    blog.comments = blog.comments.concat(comment);
    await blog.save();
    response.json(blog);
  }
});
module.exports = blogsRouter;