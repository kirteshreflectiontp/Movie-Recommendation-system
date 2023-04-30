import React, { useContext, useState } from 'react'
import UserContext from './UserContext';
import { Link } from 'react-router-dom';
const Registerform = (props) => {
    const{loggedInUser} = useContext(UserContext);
    const [email,setEmail] = useState(props.page === 'edit' ? loggedInUser?.email : '');
    const [username,setUserName] = useState(props.page === 'edit' ? loggedInUser?.username :'');
    const [password,setPassword] = useState(props.page === 'edit' ? loggedInUser?.password :'');
    const [errormessage,setErrorMessage] = useState();
    const [userCheck,setUserCheck] = useState(false);
    const [suggestion,setSuggestion] = useState(false);
    const validateUser = () => {
      let valid = false;
      if(  email !==''&& username !== ''&&  password !==''  ){
        valid = true;
      }
      return valid;
    }
    const UserAlreadyRegistered = (userList, username) => {
        const filteredUserList = userList?.filter((user) => {
            const userObject = JSON.parse(user);
            if(userObject.username === username){
                return user;
            }
        })
        return filteredUserList;
    }
    const Register = (userList,users) => {
if(UserAlreadyRegistered(userList,users.username).length > 0) {
setUserCheck(users.username);
let value = Math.random() * 9;
if(UserAlreadyRegistered(userList,users.username + parseInt(value)).length === 0){
    setSuggestion(users.username + parseInt(value))
}
}
else{
    setUserCheck(false);
    userList.push(JSON.stringify(users));
    localStorage.setItem('userList',JSON.stringify(userList));
    console.log('userList', userList);
    setErrorMessage('')
    window.location.href = '/';
}    
}
    const UpdateProfile = (userList,users) => {
        const filteredUserList = userList.filter((user) => {
            const userObject = JSON.parse(user);
            if(userObject.username !== loggedInUser.username){
                return (user);
            }
        })
        filteredUserList.push(JSON.stringify(users));
        localStorage.setItem('userList',JSON.stringify(filteredUserList));
        setErrorMessage('')
        window.location.href = './Home';
    }
    const SaveProfile = () => {
        if(validateUser()){
          const users = {
            email: email,
            username: username,
            password:props.page === 'edit' ? loggedInUser.password : password
          }
          console.log('users',users);
          let userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];
        if(props.page === 'edit'){
            UpdateProfile(userList,users)
        }
        else{
            Register(userList,users)
        }
        }
        else{
          setErrorMessage('Please Fill All Data Inputs')
        }
      }
  return (
    <div className='body_b'>
         <div className="head">
                    <div className='logo'>LoGo</div>

                    <div><button className='signup_button'><Link to= '/'>SIGN IN</Link></button></div>
                </div>
 {props.page !== 'edit' ?
         <div className="main">
                            <div className='login_head'>Sign Up</div>
                            <div>Wellcome! Please Enter Your Details</div>
                            <div className='error_message'>{errormessage}</div>
                           {userCheck && <div className='error_message'>{userCheck} Username is Allready Exist <b className='try'>Try:{suggestion}</b>  </div>}
                        </div>
                        :
                        <div className="main">
                        <div className='login_head'>Edit Information</div>
                    </div>
}
         <div>
         <br />
                        <br />
                        <br />
                            <div className='input-data'>
                                <input name='email' value={email}  onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email Address" />
                            </div>
                           
                            <div className='input-data'>
                                <input  name='username' value={username} onChange={(event) => setUserName(event.target.value)} type="text" placeholder="User Name" />
                            </div>
                            {props.page === 'edit' ? <></> :
                            <div className='input-data'>
                                <input onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
                            </div>
                            }
                            <br />
                            <br />
                            <br />
                            <div className='input-data'>
                            <button className='login_button' onClick={SaveProfile}>{props.page === 'edit' ? <>Save</> : <>Sign Up</>}</button>
                            </div>
             </div>
                    
    </div>
  )
}

export default Registerform