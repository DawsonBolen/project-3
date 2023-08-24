import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client'; // Import useMutation
import { CREATE_ACCOUNT, LOGIN } from '../../utils/mutation'; // Import your GraphQL mutations
import '../styles/Welcome.css';

const Welcome = () => {
  // const history = useHistory();
  const [login, showLogin] = useState(false);
  const toggleShowLogin = () => {
    showLogin(!login);
  };

  const [createAccount] = useMutation(CREATE_ACCOUNT); // Use your CREATE_ACCOUNT mutation
  const [loginUser] = useMutation(LOGIN); // Use your LOGIN mutation

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!login) {
      // Create account logic using Apollo Client
      try {
        await createAccount({
          variables: {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
          },
        });
        // Account created successfully, redirect to homepage
        // history.push('/HomePage');
      } catch (error) {
        console.error('Error creating account:', error);
      }
    } else {
      // Login logic using Apollo Client
      try {
        await loginUser({
          variables: {
            username: formData.get('username'),
            password: formData.get('password'),
          },
        });
        // Login successful, redirect to homepage
        // history.push('/HomePage');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <main className='welcome'>
      <div className='welcome-main'>
        {/* Content for welcome-main */}
      </div>
      <div className='sign-in-form-body'>
        {!login ? (
          <div>
            <h2>Create an Account</h2>
            <form id='signup-form' onSubmit={handleFormSubmit}>
              <input type='text' placeholder='username' name='username' />
              <input type='text' placeholder='email' name='email' />
              <input type='password' placeholder='password' name='password' />
              <input type='password' placeholder='confirm password' />
              <button id='signup-button' className='login-button'>Create Profile</button>
            </form>
            <p>Already have an account? Login <a className='normal-link' onClick={toggleShowLogin}>Here</a></p>
          </div>
        ) : (
          <div>
            <h2>Login to Your Account</h2>
            <form id='login-form' onSubmit={handleFormSubmit}>
              <input type='text' placeholder='username' name='username' />
              <input type='text' placeholder='email' name='email' />
              <input type='password' placeholder='password' name='password' />
              <button id='login-button' className='login-button'>Login</button>
            </form>
            <p>Don't have an account? Create One <a className='normal-link' onClick={toggleShowLogin}>Here</a></p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Welcome;