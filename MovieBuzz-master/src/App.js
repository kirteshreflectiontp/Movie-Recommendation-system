import './App.css';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import UserContext from './components/UserContext';
import { useState } from 'react';
function App() {
  const [initialPage,setInitialPage] = useState('login');
  const [currentUser, setcurrentUser] = useState(sessionStorage?.username);
  const setCurrentUserData = (data) => {
    setcurrentUser(data)
  }
  return (
   <div>
 <BrowserRouter>
 <UserContext.Provider value = {{loggedInUser:currentUser, setLoggedInUser : setCurrentUserData}}>
  <div>
 {(initialPage !== 'login' && initialPage !== 'signup' )}
      <Routes>
      <Route path="signup" element={<Signup/>} />
          <Route path='main' element={<Main/>} />
          <Route index element ={<Login setInitialPage={setInitialPage}/>}/>
      </Routes>
      </div>
      </UserContext.Provider>
    </BrowserRouter>
    
   </div>
  );
}
export default App;
