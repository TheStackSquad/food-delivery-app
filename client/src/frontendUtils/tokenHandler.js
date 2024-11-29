//client/src/frontendUtils/tokenHandler.js

export const handleTokenExpiration = (error) => {
    if (error.response?.status === 403 && error.response.data.message === 'Invalid or expired token') {
      alert("Session expired. Please log in again.");
      window.location.href = "/login"; // Redirect user to login page
    }
  };
  