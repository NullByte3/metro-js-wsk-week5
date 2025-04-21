import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {showRegister ? (
        <>
          <RegisterForm />
          <button onClick={() => setShowRegister(false)}>
            Already have an account? Login here
          </button>
        </>
      ) : (
        <>
          <LoginForm />
          <button onClick={() => setShowRegister(true)}>
            Don't have an account? Register here
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
