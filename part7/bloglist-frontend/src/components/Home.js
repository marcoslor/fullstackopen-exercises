import BlogList from "./BlogList";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

const Home = () => {
  return (
    <>
      <h2>Blogs</h2>
      <Togglable openButtonText="Add blog post" closeButtonText={"Cancel"}>
        <CreateBlog />
      </Togglable>
      <BlogList />
    </>
  );
};

export default Home;