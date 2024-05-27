import Workspace from "./components/Workspace.jsx";
import Header from "./components/Header.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "./components/auth/Registration.jsx";
import Login from "./components/auth/Login.jsx";
import MainPage from "./components/MainPage.jsx";

function App() {

  return (
      <div>
          <BrowserRouter>
                  <Header />
                  <Routes>
                      <Route path='/registration' element={<Registration/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/workspace' element={<Workspace/>} />
                      <Route path='/' element={<MainPage/>} />
                      <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App
