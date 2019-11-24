import axios from '../libs/request'

export const getData = ()=>{
    return axios.request({
        url: '/data.json',
        method:'post'
    })
}