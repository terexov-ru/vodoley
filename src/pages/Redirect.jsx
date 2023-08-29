import React from "react";
import { Navigate } from "react-router-dom";

const Redirect = () => {
    const token = localStorage.getItem('VodoleyToken');
    if (token == null) {
        return <Navigate to='/auth' replace />;
    } else {
        return <Navigate to='/main' replace />;
    }
};


export default Redirect