import React from "react";
import { Redirect } from "react-router-dom";

const AdminRoutes = ({userType, path, children}) => {
    path = path || "";
    if(userType!="admin" && path.match(/admin/)){
        return <Redirect to="/dashboard" />
    }
    return (
        <>
            {children}
        </>
    )
}

export default AdminRoutes
