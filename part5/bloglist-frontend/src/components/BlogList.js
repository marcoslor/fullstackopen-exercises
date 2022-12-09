import Blog from "./Blog";
import Togglable from "./Togglable";

const BlogList = ({ blogs, likePost, removePost }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>

      {sortedBlogs?.map((blog) => (
        <Togglable key={blog.id} teaser={blog.title}>
          <Blog blog={blog} removePost={removePost} likePost={likePost} />
        </Togglable>
      ))}
    </>
  );
};

export default BlogList;
