
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
const [progress, setProgress] = useState(0);
useEffect(() => {
  // 1. Send the wake-up ping to Render IMMEDIATELY (Your idea!)
  // Note: We don't use "await" because we want the code below to run instantly.
  const wakeUpPing = fetch("/users/wakeup");

  // 2. Start the visual trick
  setProgress(10);
  
  // 3. Schedule the slow crawl
  const timer1 = setTimeout(() => setProgress(25), 3000);  
  const timer2 = setTimeout(() => setProgress(50), 8000);  
  const timer3 = setTimeout(() => setProgress(75), 15000); 
  const timer4 = setTimeout(() => setProgress(90), 22000); 

  // A handy function to kill all timers at once
  const clearAllTimers = () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
    clearTimeout(timer4);
  };

  // 4. Wait for that ping from Step 1 to answer
  wakeUpPing
    .then(() => {
      clearAllTimers(); // Render is awake! Kill the slow timers!
      setProgress(100); // Shoot to 100%
    })
    .catch(() => {
      clearAllTimers(); 
      setProgress(100); 
    });

  // Cleanup if the user leaves the page before it finishes
  return () => clearAllTimers();
  
}, []);
  return (

   <BrowserRouter>
   
   <Navbar log={isloggedin} setlog={setloggedin} ></Navbar>
   <Routes>
   {/* <Route path="/" element={<Home />} /> */}
    <Route path="/login" element={<Login setlog={setloggedin} loading={setProgress}></Login>}> </Route>
    <Route path="/fetchnotes" element={<Notes log={isloggedin} loading={setProgress} ></Notes>}></Route>
    <Route path="/note/:id" element={<Fullnoteview loading={setProgress}></Fullnoteview>} ></Route>
    <Route path="/createnote" element={<Createnote loading={setProgress}></Createnote>}></Route>
    <Route path="/updatenote/:id" element={<Updatenotes loading={setProgress}></Updatenotes>}></Route>
    <Route path="/setting" element={<Settings loading={setProgress}></Settings>}></Route>
    <Route path="/updatepassword" element={<Updatepassword loading={setProgress}></Updatepassword>}></Route>
    <Route path="/registeruser" element={<Registeruser setlog={setloggedin} loading={setProgress}></Registeruser>}></Route>
    <Route path="/updateuser" element={<Updateuser setlog={setloggedin} loading={setProgress}></Updateuser>}></Route>
    <Route path="/deleteuser" element={<Deleteuser setlog={setloggedin} loading={setProgress}></Deleteuser>}></Route>
    
   </Routes>
   </BrowserRouter>

  );
}

export default App;
