import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/loader';
const ProtectedRoute = ({ isAdmin,children}) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading the authentication status from the server
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <div><Loader/></div>;
  }

    if(isAuthenticated===false){
      return <Navigate to="/login" />
    }
    if(isAdmin===true && user.role!=="admin"){
      return <Navigate to="/login" />
    }



    return children;





  // return (
  //   <Fragment>
  //   {loading === false && (

  //     <Route
  //       {...rest}
  //       render={(props) => {
  //         if (isAuthenticated === false) {
  //           return <Navigate to="/login" />;
  //         }
  //         if (isAdmin === true && user.role !== "admin") {
  //             return <Navigate to="/login" />;
  //           }

  //         return <Component {...props} />;
  //       }}
  //     />
  //   )}
  // </Fragment>

  // );
};

export default ProtectedRoute;