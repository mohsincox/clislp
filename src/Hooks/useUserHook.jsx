import React from "react";
import {useEffect, useState} from "react";


const useUserHook = (defaultState = null) => {
    let [user, setUser] = useState(defaultState);
    useEffect(() => {
        const getLoginData = localStorage.getItem("loginData");
        if (getLoginData !== null) {
            const data = JSON.parse(getLoginData);
            setUser(() => {
                return {
                    id: data.id,
                    name : data.name,
                    token: data.accessToken,
                    userInfo: data
                }
            });
        }
    }, [])

    return [user, setUser];
}

export default useUserHook;