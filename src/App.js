import './App.css';
import Alert from './Components/Alert';
import NoteState from './Context/notes/NoteState';
import About from './Pages/About';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom"
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <NoteState>
      <div >
        <Router>

          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>

              <Route path='/' index element={<Home showAlert={showAlert} />} />
              <Route path='/about' index element={<About />} />
              <Route path='/signup' index element={<Signup showAlert={showAlert} />} />
              <Route path='/login' index element={<Login showAlert={showAlert} />} />

            </Routes>
          </div>


        </Router>
      </div>
    </NoteState>
  );
}

export default App;
