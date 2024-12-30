//client/src/Pages/RiderRoutes/RiderLogin.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { riderLogin } from "../../API/signIn";
import Alert from "../../components/UI/Alert";
import "../../css/RiderSignUp.css"; // Ensure it has styles for padding, spacing, etc.
import "../../css/Alert.css"; // Ensure it has styles for the alert

const RiderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertState, setAlertState] = useState({
    isVisible: false,
    type: "info",
    message: "",
    userName: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showAlert = (type, message, userName = "") => {
    setAlertState({
      isVisible: true,
      type,
      message,
      userName,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
       // eslint-disable-next-line
      const response = await riderLogin(email, password);
      showAlert("success", "Login successful!");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/rider/profile");
      }, 2000);
    } catch (error) {
      showAlert("error", error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alert
        isVisible={alertState.isVisible}
        type={alertState.type}
        message={alertState.message}
        userName={alertState.userName}
        onClose={() => setAlertState((prev) => ({ ...prev, isVisible: false }))}
      />
      <Container className="login-container ">
        <Row>
          <Col xs={12} md={8} lg={6}>
            <h1 className="header-text-login">Rider Login</h1>
            <Form
              onSubmit={handleLogin}
              className="p-4 border rounded shadow-lg bg-white form-container"
            >
              {/* Email Input */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="text-secondary">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="text-secondary">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="custom-input"
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2 custom-btnRider"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Toggle Link */}
              <p
                className="text-center mt-3 text-primary fw-bold cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/rider/signup")}
              >
                Don't have an account? Sign up
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RiderLogin;

