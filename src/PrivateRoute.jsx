import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuthStore} from "./store/index.js";


const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to='/login' replace />;
};

export default PrivateRoute;