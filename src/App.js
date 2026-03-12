
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Fullnoteview from './components/Fullnoteview';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Notes from './components/Notes';
import Createnote from './components/Createnote';
import Updatenotes from './components/Updatenotes';
import Settings from './components/Settings';
import Updatepassword from './components/Updatepassword';
import Registeruser from './components/Registeruser';
import Updateuser from './components/Updateuser';
import Deleteuser from './components/Deleteuser';


function App() {
  // Change this line
const [isloggedin, setloggedin] = useState(sessionStorage.getItem("isLoggedIn") === "true");
  return (

   <BrowserRouter>
   
   <Navbar log={isloggedin} setlog={setloggedin} ></Navbar>
   <Routes>
   {/* <Route path="/" element={<Home />} /> */}
    <Route path="/login" element={<Login setlog={setloggedin}></Login>}> </Route>
    <Route path="/fetchnotes" element={<Notes log={isloggedin}  ></Notes>}></Route>
    <Route path="/note/:id" element={<Fullnoteview></Fullnoteview>}></Route>
    <Route path="/createnote" element={<Createnote></Createnote>}></Route>
    <Route path="/updatenote/:id" element={<Updatenotes></Updatenotes>}></Route>
    <Route path="/setting" element={<Settings></Settings>}></Route>
    <Route path="/updatepassword" element={<Updatepassword></Updatepassword>}></Route>
    <Route path="/registeruser" element={<Registeruser setlog={setloggedin}></Registeruser>}></Route>
    <Route path="/updateuser" element={<Updateuser setlog={setloggedin}></Updateuser>}></Route>
    <Route path="/deleteuser" element={<Deleteuser setlog={setloggedin}></Deleteuser>}></Route>
    
   </Routes>
   </BrowserRouter>

  );
}

export default App;
