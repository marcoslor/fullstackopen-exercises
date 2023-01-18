import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UsersList = () => {
  const users = useSelector(state => state.users);

  console.log({ "list":users });

  return (
    <div>
      <h2 className="mb-2">Users</h2>
      <Table hover>
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user?.blogs?.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;