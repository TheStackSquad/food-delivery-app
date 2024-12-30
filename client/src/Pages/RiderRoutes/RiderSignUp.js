import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { riderSignUpUser } from "../../API/signup";
import {
  validateFullname,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../../frontendUtils/validation";
import Alert from "../../components/UI/Alert";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../css/RiderSignUp.css";
import "../../css/Alert.css";

const RiderSignUp = () => {
  const navigate = useNavigate();

  const [alertState, setAlertState] = useState({
    isVisible: false,
    type: "success",
    message: "",
    userName: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const showAlert = (type, message, userName = "") => {
    setAlertState({
      isVisible: true,
      type,
      message,
      userName,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    const fullNameValidation = validateFullname(formData.fullName);
    if (!fullNameValidation.isValid) {
      formErrors.fullName = fullNameValidation.error;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      formErrors.email = emailValidation.error;
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      formErrors.phone = phoneValidation.error;
    }

    const passwordValidation = validatePassword(
      formData.password,
      formData.confirmPassword
    );
    if (!passwordValidation.isValid) {
      formErrors.password = passwordValidation.error;
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});

      try {
        await riderSignUpUser(formData, "/api/rider/signup");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        showAlert(
          "success",
          `Hi ${formData.fullName}! Your rider application has been received. We'll review your details and get back to you soon. Check your email for further instructions.`,
          formData.fullName
        );

        setTimeout(() => {
          navigate("/rider/login");
        }, 3000);
      } catch (error) {
        showAlert(
          "error",
          error.message || "An error occurred during signup. Please try again."
        );
      }
    } else {
      setErrors(formErrors);
      showAlert(
        "error",
        "Please correct the errors in the form before submitting."
      );
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
        autoCloseTime={5000}
      />
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col lg={6} md={8} sm={12}>
            <h1 className="text-center mb-4 header-text">Create Rider Account</h1>
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-white form-container">
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  isInvalid={!!errors.fullName}
                  placeholder="Enter your full name"
                  className="custom-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="Enter your email"
                   className="custom-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  placeholder="Enter your phone number"
                   className="custom-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  placeholder="Enter your password"
                   className="custom-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                  placeholder="Confirm your password"
                   className="custom-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit"
              variant="primary"
               className="w-100 py-2 custom-btnRider"
            >
                Sign Up
              </Button>

              <p
                className="mt-3 text-center text-primary"
                onClick={() => navigate("/rider/login")}
                style={{ cursor: "pointer" }}
              >
                Already have an account? Log in
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RiderSignUp;
