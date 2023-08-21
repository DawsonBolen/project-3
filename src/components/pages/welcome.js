import React, { useState } from 'react'
import '../styles/Welcome.css';

const Welcome = () => {
    const [login, showLogin] = useState(false);
    const toggleShowLogin = () => {
        showLogin(!login);
    }
    return (
        <main className='welcome'>
            <div className='welcome-main'>

            </div>
            <div className='sign-in-form-body'>
                {!login ? (
                    <div>
                        <h2>Create an Account</h2>
                        <form id='signup-form'>
                            <input type='text' placeholder='username'></input>
                            <input type='text' placeholder='email'></input>
                            <input type='password' placeholder='password'></input>
                            <input type='password' placeholder='confirm password'></input>
                            <button id='signup-button' className='login-button'>Create Profile</button>
                        </form>
                        <p>Already have an account? Login <a className='normal-link' onClick={toggleShowLogin}>Here</a></p>
                    </div>
                ) :
                    <div>
                        <h2>Login to Your Account</h2>
                        <form id='login-form'>
                            <input type='text' placeholder='username'></input>
                            <input type='text' placeholder='email'></input>
                            <input type='password' placeholder='password'></input>
                            <button id='login-button' className='login-button'>Login</button>
                        </form>
                        <p>Don't have an account? Create One <a className='normal-link' onClick={toggleShowLogin}>Here</a></p>
                    </div>
                }
            </div>
        </main>
    )
}

export default Welcome