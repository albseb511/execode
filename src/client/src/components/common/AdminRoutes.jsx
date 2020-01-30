import React from "react";
import { Redirect } from "react-router-dom";

const AdminRoutes = ({userType, children}) => {
    if(userType!="admin"){
        return <Redirect to="/dashboard" />
    }
    return (
        <>
            {children}
        </>
    )
}

export default AdminRoutes
