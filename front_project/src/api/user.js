import axios from "@/libs/api.request";

export const login = ({ userName, password }) => {
    const data = {
        userName,
        password
    };
    return axios.request({
        url: "/api/login",
        data,
        method: "post"
    });
};

export const logout = () => {
    return axios.request({
        url: "/api/logout",
        method: "post"
    });
};

export const getUserInfo = token => {
    return axios.request({
        url: "get_info",
        params: {
            token
        },
        method: "get"
    });
};

export const modifyPwd = data => {
    return axios.request({
        url: "/api/back/user/modpwd",
        data,
        method: "POST"
    });
};
