import axios from '../libs/request'

export const login = ({ userName, password }) => {
    return axios.request({
        url: '/user/login',
        method: 'post',
        data: {
            userName,
            password
        }
    })
}

export const register = ({ nick, userName, password }) => {
    return axios.request({
        url: '/user/register',
        method: 'post',
        data: {
            nick,
            userName,
            password
        }
    })
}

export const userInfo = () => {
    return axios.request({
        url: '/user/userInfo',
        method: 'get',
    })
}