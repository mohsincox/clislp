import React from 'react';
import useUserHook from "../Hooks/useUserHook";
import { useNavigate } from "react-router-dom";

function MustAdminAuth(props) {
    const navigate = useNavigate();
    let [user] = useUserHook(null, true);


    if(user) {
        if(user.userInfo.userrole.role.role_name !== 'Customer') return props.children
        else navigate("/");
    }
}

export default MustAdminAuth;