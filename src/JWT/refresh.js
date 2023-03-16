import React from 'react';
import axios from 'axios';
import { getCookie, removeCookie } from '../cookie/cookie';
import moment from 'moment';

const refresh = async (config) => {
    const refreshToken = getCookie("refreshToken");
    const accessTokenExpireTime = localStorage.getItem("accessTokenExpireTime");

    if(moment.duration(moment(accessTokenExpireTime).diff(moment())).asMinutes() < 1 && refreshToken) {
        const token = await axios.post("/user/refresh", {
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: refreshToken
        }, {
            headers : { Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") }
        })
        localStorage.setItem("accessToken", token.data.accessToken);
        localStorage.setItem("accessTokenExpireTime", moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss"));
    }
    config.headers["Authorization"] = localStorage.getItem("grantType") + localStorage.getItem("accessToken");
    return config;
}

const refreshErrorHandle = (error) => {
    removeCookie("refreshToken");
  };
  
export { refresh, refreshErrorHandle };