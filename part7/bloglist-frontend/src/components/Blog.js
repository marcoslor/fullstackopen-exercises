import PropTypes from "prop-types";
import { Button, Form, ListGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { blogsServiceActions } from "../reducers/blogsReducer";
import blogsService from "../services/blogsService";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login);

  const serviceActions = blogsServiceActions(blogsService(token));

  const likePost  = () => {
    dispatch(serviceActions.likeBlog(blog));
  };
  const removePost = () => {
    dispatch(serviceActions.removeBlog(blog));
  };

  const addComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    dispatch(serviceActions.createComment(blog, comment));
    event.target.reset();
  };

  return (
    <div className="blog">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>URL</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{blog.title}</td>
            <td>{blog.author}</td>
            <td>{blog.url}</td>
            <td>{blog.likes}</td>
          </tr>
        </tbody>
      </Table>
      {/* spaced arround */}
      <div className="d-flex justify-content-between mb-5">
        <Button onClick={likePost}>like</Button>
        <Button className="btn-danger" onClick={removePost}>
          remove
        </Button>
      </div>
      <h3>Comments</h3>
      <ListGroup className="mb-4">
        {blog.comments.map((comment) => (
          <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={addComment}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label className="h4">Add a comment</Form.Label>
          <Form.Control type="text" placeholder="Enter comment" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
