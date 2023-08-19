import { useEffect, useContext } from "react";
import { GlobalContext } from "./context/Context.js";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx"
import Signup from "./pages/Signup/Signup.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Dashboard2 from "./pages/Dashboard/Dashboard2.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import './App.css';

function App() {

  let { state , dispatch } = useContext(GlobalContext);

  return( 
    <div className="App">

{   ( state?.isLogin === false || null) ? (
    <Routes>
      <Route path="/" exact element={<Dashboard2 />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )}
  
  </div>)
}



export default App;
