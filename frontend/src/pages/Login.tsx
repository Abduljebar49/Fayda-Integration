import React from "react";

const Login: React.FC = () => {
  const handleLogin = () => {
    console.log("message : ",)
    window.location.href = "http://localhost:3000/auth/login";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
