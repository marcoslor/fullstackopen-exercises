import Blog from "./Blog";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

const LogoutButton = ({ setToken, addNotification, clearAllNotifications }) => {
  const onClick = () => {
    setToken(null);
    clearAllNotifications();
    addNotification("Logged out successfully", "success");
  };

  return <button onClick={onClick}>Logout</button>;
};

const CreateBlog = ({ token, setBlogs, addNotification }) => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    };

    try {
      await blogService.create(blog, token.token);
      addNotification(`Blog "${blog.title}" created successfully`, "success");
    } catch (error) {
      addNotification(error.response.data.error, "error");
    }

    const updatedBlogs = await blogService.getAll(token.token);
    setBlogs(updatedBlogs);
  };

  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" placeholder="title" required />
        <br />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" placeholder="author" required />
        <br />
        <label htmlFor="url">Url</label>
        <input type="text" name="url" placeholder="url" required />
        <br />
        <input type="submit" value="Create" />
      </form>
    </>
  );
};

const BlogList = ({
  blogs,
  setBlogs,
  token,
  setToken,
  addNotification,
  clearAllNotifications,
}) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <>
      <div>
        <span>Hello, {token.username}</span>{" "}
        <LogoutButton
          setToken={setToken}
          addNotification={addNotification}
          clearAllNotifications={clearAllNotifications}
        />
      </div>
      <Togglable openButtonText="Add blog post" closeButtonText={"Cancel"}>
        <CreateBlog
          token={token}
          setBlogs={setBlogs}
          addNotification={addNotification}
        />
      </Togglable>

      <h2>Blogs</h2>

      {sortedBlogs?.map((blog) => (
        <Togglable key={blog.id} teaser={blog.title}>
          <Blog blog={blog} blogs={blogs} token={token} setBlogs={setBlogs} />
        </Togglable>
      ))}
    </>
  );
};

export default BlogList;