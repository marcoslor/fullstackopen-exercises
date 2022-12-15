import PropTypes from "prop-types";

const Blog = ({ blog, likePost, removePost }) => {
  return (
    <div className="blog">
      <ul>
        <li>{blog.title}</li>
        <li>{blog.author}</li>
        <li>{blog.url}</li>
        <li>Likes: {blog.likes} <button className="blog--like" onClick={() => likePost(blog)}>like</button></li>
      </ul>
      <button className="blog--remove" onClick={() => removePost(blog)}>remove</button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
};

export default Blog;