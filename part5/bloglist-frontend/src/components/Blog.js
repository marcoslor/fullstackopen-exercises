import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs, blogs, token }) => {
  const likePost = async () => {
    blogService.put(blog.id, {
      likes: blog.likes + 1,
    }, token.token);

    setBlogs(blogs.map((b) => (b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b)));
  };

  const removePost = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id, token.token);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  return (
    <div className="blog">
      {blog.title}
      <br />
      {blog.author}
      <br />
      {blog.url}
      <br />
      {blog.likes} <button onClick={likePost}>like</button>
      <br />
      <button onClick={removePost}>remove</button>
    </div>
  );};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
};

export default Blog;