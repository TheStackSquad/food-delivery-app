import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { riderLogin } from '../../API/signIn';
import Alert from '../../components/UI/Alert';
import "../../css/RiderSignUp.css";
import "../../css/Alert.css";

const RiderLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertState, setAlertState] = useState({
    isVisible: false,
    type: 'info',
    message: '',
    userName: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showAlert = (type, message, userName = '') => {
    setAlertState({
      isVisible: true,
      type,
      message,
      userName
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // eslint-disable-next-line
      const response = await riderLogin(email, password);
      showAlert('success', 'Login successful!');
      
      // Clear the input fields
      setEmail('');
      setPassword('');

      // Redirect to /rider/profile after a short delay
      setTimeout(() => {
        navigate('/rider/profile');
      }, 2000);
    } catch (error) {
      showAlert('error', error.message || 'Login failed');
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
        onClose={() => setAlertState(prev => ({ ...prev, isVisible: false }))}
      />
      <div className="customSignupContainer">
        <h1>Rider Login</h1>
        <form onSubmit={handleLogin} className="customSignupForm">
          {/* Rest of the form remains the same */}
          <div className="customInputGroup">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="customInput"
              placeholder="Enter Email Address"
            />
            <label htmlFor="email" className="customLabel">
              Email Address
            </label>
          </div>

          <div className="customInputGroup">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="customInput"
              placeholder="Password"
            />
            <label htmlFor="password" className="customLabel">
              Password
            </label>
          </div>

          <button 
            type="submit" 
            className="customSubmitButton" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
};

export default RiderLogin;