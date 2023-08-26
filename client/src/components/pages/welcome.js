import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client'; // Import useMutation
import { CREATE_ACCOUNT, LOGIN } from '../../utils/mutation'; // Import your GraphQL mutations
import '../styles/Welcome.css';
import Auth from '../../utils/auth';

function Welcome() {
  const navigate = useNavigate();
  const [login, showLogin] = useState(false);

  const [formData, setData] = useState({ username: '', email: '', password: '' })

  const [createAccount] = useMutation(CREATE_ACCOUNT); // Use your CREATE_ACCOUNT mutation
  const [loginUser] = useMutation(LOGIN); // Use your LOGIN mutation

  const toggleShowLogin = () => {
    showLogin(!login);
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...formData, [name]: value });
  };

  // const handleChange = async (e) => {
  //   e.preventDefault();

  //   //DRE added this section. We must change variables
  //   console.log(formData);
  //   try {
  //     const { data } = await login({
  //       variables: { ...formData },
  //     });
  //     //the auth is related to local storage
  //     Auth.login(data.login.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   // clear form values
  //   setFormData({
  //     username:'',
  //     email: '',
  //     password: '',
  //   });
  // };
  //DRE stopped adding in this section

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!login) {
        // Create account logic using Apollo Client
        const response = await createAccount({
          variables: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        });
        console.log(response.data.createUser.token);

        const token = response.data.createUser.token;
        Auth.login(token);
    
        navigate('/Home');
      } else {
        // Login logic using Apollo Client
        const response = await loginUser({
          variables: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        });

        // Assuming `data.login.token` contains the authentication token
        // You need to handle this based on the actual response structure

        // Redirect to homepage or handle authentication as needed
        // For now, let's log the token to the console
        const token = response.data.login.token;
        console.log(Headers)
        Auth.login(token);
      }
    } catch (error) {
      console.error('Error:', error);
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
              <input onChange={handleChange} value={formData.username} type='text' placeholder='username' name='username' />
              <input onChange={handleChange} value={formData.email} type='text' placeholder='email' name='email' />
              <input onChange={handleChange} value={formData.password} type='password' placeholder='password' name='password' />
              {/* <input onChange={handleChange} value={formData.password} type='password' placeholder='confirm password' /> */}
              <button onClick={handleFormSubmit} type='submit' id='signup-button' className='login-button'>Create Profile</button>
            </form>
            <p>Already have an account? Login <a className='normal-link' onClick={toggleShowLogin}>Here</a></p>
          </div>
        ) : (
          <div>
            <h2>Login to Your Account</h2>
            <form id='login-form' onSubmit={handleFormSubmit}>
              <input onChange={handleChange} value={formData.username} type='text' placeholder='username' name='username' />
              <input onChange={handleChange} value={formData.email} type='text' placeholder='email' name='email' />
              <input onChange={handleChange} value={formData.password} type='password' placeholder='password' name='password' />
              <button type='submit' id='login-button' className='login-button'>Login</button>
            </form>
            <p>Don't have an account? Create One <a className='normal-link' onClick={toggleShowLogin}>Here</a></p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Welcome;