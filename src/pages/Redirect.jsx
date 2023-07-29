import React from "react";
import {Navigate, useNavigate} from "react-router-dom";


const Redirect = () => {
    let navigate = useNavigate();
    const token = localStorage.getItem('VodoleyToken')
    if(token == null) {
        return(<Navigate to='/auth' />)
    } else {
        return(<Navigate to='/main' />)
    }
    return(
        <></>
    )
}

export default Redirect