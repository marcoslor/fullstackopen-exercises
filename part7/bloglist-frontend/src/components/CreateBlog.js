import { blogsServiceActions } from "../reducers/blogsReducer";
import blogsService from "../services/blogsService";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { pushNotificationAction } from "../reducers/notificationsReducer";

const CreateBlog = () => {
  const token = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    const blogsActions = blogsServiceActions(blogsService(token));
    await dispatch(blogsActions.createBlog(blog));
    dispatch(pushNotificationAction({ message: "Blog created", type: "success" }));
    event.target.reset();
  };
  return (
    <>
      <h3>Create Post</h3>
      <Form onSubmit={onSubmit} className="mb-3">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Author" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="URL" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
export default CreateBlog;
