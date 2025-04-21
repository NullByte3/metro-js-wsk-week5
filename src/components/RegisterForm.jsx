import React from 'react';
import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/ApiHooks';

const RegisterForm = () => {
  const { postUser } = useUser();
  const initValues = { username: '', password: '', email: '' };
  const { inputs, handleInputChange, handleSubmit } = useForm(async () => {
    try {
      await postUser(inputs);
      alert('User registered successfully!');
    } catch (e) {
      alert('Registration failed: ' + e.message);
    }
  }, initValues);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={inputs.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={inputs.email}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
