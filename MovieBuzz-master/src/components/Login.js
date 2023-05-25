import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";
const Login = (props) => {
  props.setInitialPage('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const login = () => {
    if (username !== '' && password !== '') {
      const userList = JSON.parse(localStorage.getItem('userList'));
      console.log(userList);
      userList?.map((user) => {
        let currentUser = JSON.parse(user)
        if (currentUser.username === username && currentUser.password === password) {
          setErrorMessage('');
          sessionStorage.username = username;
          window.location.href = './main'
        }
        else {
          setErrorMessage('Enter Correct Credentials');
        }
      })
    }
  }
  return (
    <div className='body_main'>
      <div className='body_b'>
        <div className="head">
          <div className='logo'>Movie BUZZ</div>

          <div><Link to='./Signup'><button className='bn30'>SIGN UP</button></Link></div>
        </div>

        <div>
          <div className="main">
            <div className='login_head'>Login</div>
            <div>Welcome !Please enter your details.</div>
            <div className='error_message'>{errorMessage}</div>
          </div>
          <br />
          <br />
          <br />
          <div>

            <div className='input-data'>
              <input name='username' value={username} onChange={(event) => setUsername(event.target.value)} type="text" placeholder="User Name" />
            </div>
            <div className='input-data'>
              <input name='password' value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
            </div>
            <div className='forgot'><span>Forgot Password?</span> </div>
            <br />
            <br />
            <br />
            <div className='input-data'>
              <button className='bn29' onClick={login}>LOGIN</button>
            </div>
          </div>
        </div>
        <div className="foot">
          <div>All copyright &copy; reserved Library of Life</div>
          <div><span className='termscondition'>Terms & Conditions</span><span>Privacy Policy</span> </div>
        </div>
      </div>
    </div>
  )
}

export default Login