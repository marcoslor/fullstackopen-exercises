import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Blog from "./Blog";

const BlogView = () => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id));
  const navigate = useNavigate();

  useEffect(() => {
    if (!blog && blogs !== null) {
      navigate("/");
    }
  }, [blog]);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <Blog blog={blog} />
    </div>
  );
};

export default BlogView;