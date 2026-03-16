import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Fullnoteview from './components/Fullnoteview';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // <-- Added Navigate here
import { useState } from 'react';
import Notes from './components/Notes';
import Createnote from './components/Createnote';
import Updatenotes from './components/Updatenotes';
import Settings from './components/Settings';
import Updatepassword from './components/Updatepassword';
import Registeruser from './components/Registeruser';
import Updateuser from './components/Updateuser';
import Deleteuser from './components/Deleteuser';
import LoadingBar from "react-top-loading-bar";

function App() {
  const [isloggedin, setloggedin] = useState(sessionStorage.getItem("isLoggedIn") === "true");
  const [progress, setProgress] = useState(0); 

  return (
    <BrowserRouter>
      <LoadingBar height={3} color="#f11946" progress={progress} />
      
      <Navbar log={isloggedin} setlog={setloggedin} />

      <Routes>
        {/* NEW: Automatically redirect the home page to the login page */}
        <Route path="/" element={<></>} />
        
        <Route path="/login" element={<Login setlog={setloggedin} loading={setProgress} />} />
        <Route path="/fetchnotes" element={<Notes log={isloggedin} loading={setProgress} />} />
        <Route path="/note/:id" element={<Fullnoteview loading={setProgress} />} />
        <Route path="/createnote" element={<Createnote loading={setProgress} />} />
        <Route path="/updatenote/:id" element={<Updatenotes loading={setProgress} />} />
        <Route path="/setting" element={<Settings loading={setProgress} />} />
        <Route path="/updatepassword" element={<Updatepassword loading={setProgress} />} />
        <Route path="/registeruser" element={<Registeruser setlog={setloggedin} loading={setProgress} />} />
        <Route path="/updateuser" element={<Updateuser setlog={setloggedin} loading={setProgress} />} />
        <Route path="/deleteuser" element={<Deleteuser setlog={setloggedin} loading={setProgress} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;