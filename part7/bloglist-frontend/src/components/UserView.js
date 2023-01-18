import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserView = () => {
  const id = useParams().id;
  const user = useSelector(state => state.users.find(user => user.id === id));
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup hover>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserView;