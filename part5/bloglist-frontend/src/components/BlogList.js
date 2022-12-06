import Blog from "./Blog";
import blogService from "../services/blogs";

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
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;

    try {
      await blogService.create(title, author, url, token.token);
      addNotification(`Blog "${title}" created successfully`, "success");
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
      <CreateBlog
        token={token}
        setBlogs={setBlogs}
        addNotification={addNotification}
      />
      <h2>Blogs</h2>
      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;