import React from 'react';
import useForm from '../hooks/formHooks';
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {
  const { handleLogin } = useUserContext();
  const initValues = { username: '', password: '' };
  const { inputs, handleInputChange, handleSubmit } = useForm(
    () => handleLogin(inputs),
    initValues
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={inputs.username}
          onChange={handleInputChange}
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleInputChange}
          autoComplete="current-password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
