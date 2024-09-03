import React from 'react';
import "./LogoutButton.css"

const LogoutButton = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return <div className="logout-btn"><button onClick={handleLogout}>Logout</button></div>;
};

export default LogoutButton;