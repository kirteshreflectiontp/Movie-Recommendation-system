import './App.css';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [initialPage,setInitialPage] = useState('login');
  return (
   <div>
 <BrowserRouter>
  <div>
 {(initialPage !== 'login' && initialPage !== 'signup' )}
      <Routes>
      <Route path="signup" element={<Signup/>} />
          <Route path='main' element={<Main/>} />
          <Route index element ={<Login setInitialPage={setInitialPage}/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    
   </div>
  );
}
export default App;
