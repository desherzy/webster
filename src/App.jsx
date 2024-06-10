import Workspace from "./components/workspace/Workspace.jsx";
import Header from "./components/Header.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "./components/auth/Registration.jsx";
import Login from "./components/auth/Login.jsx";
import MainPage from "./components/MainPage.jsx";
import ProjectsPage from "./components/ProjectsPage.jsx";
import {useAuthStore} from "./store/index.js";
import {useEffect, useState} from "react";
import Loader from "./components/Loader.jsx";
import ConfirmMailMessage from "./components/ConfirmMailMessage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Settings from "./components/Settings.jsx";

function App() {
    const { isAuthenticated, emailConfirmed, refreshUser } = useAuthStore();
    const [isCheckingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (localStorage.getItem('token')) {
                    await refreshUser();
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            } finally {
                setCheckingAuth(false);
            }
        };

        checkAuth();

    }, [refreshUser]);


    if (isCheckingAuth) {
        return (
            <Loader/>
        );
    }


    if (!emailConfirmed && isAuthenticated) {
        return (
            <div>

                <ConfirmMailMessage/>
            </div>
        );
    }

  return (
      <div>
          <BrowserRouter>
                  <Header />
                  <Routes>
                      <Route path='/registration' element={<Registration/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/projects' element={<PrivateRoute> <ProjectsPage/> </PrivateRoute>} />
                      <Route path='/settings' element={<PrivateRoute> <Settings/> </PrivateRoute>} />
                      <Route path='/projects/workspace/:id' element={<PrivateRoute> <Workspace/> </PrivateRoute>} />
                      <Route path='/' element={<MainPage/>} />
                      <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
