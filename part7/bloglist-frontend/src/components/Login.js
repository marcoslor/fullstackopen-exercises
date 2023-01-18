import loginService from "../services/loginService";
import blogsService from "../services/blogsService";
import { useDispatch } from "react-redux";
import { pushNotificationAction } from "../reducers/notificationsReducer";
import { setToken } from "../reducers/loginReducer";
import { useNavigate } from "react-router-dom";
import { blogsServiceActions } from "../reducers/blogsReducer";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const token = await loginService.login(username, password);
      localStorage.setItem("token", JSON.stringify(token));
      dispatch(setToken(token));
      dispatch(pushNotificationAction({ message: "Logged in successfully", type: "success" }));

      const blogsActions = blogsServiceActions(blogsService(token));
      dispatch(blogsActions.getAll());

      navigate("/");
    } catch (error) {
      dispatch(pushNotificationAction({ message: "Invalid credentials", type: "danger" }));
    }
  };

  return (
    <>
      <section className="vh-100 bg-primary">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <Form onSubmit={onSubmit} className="mb-4 form-outline">
                    <Form.Group className="form-outline mb-4">
                      <FloatingLabel controlId="username" label="Username">
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          name="username"
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="form-outline mb-4">
                      <FloatingLabel controlId="password" label="Password">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" type="submit" size="lg">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
