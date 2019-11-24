import axios from '../libs/request'
export const getFoo = () => {
    return axios.request({
        url: '/data.json',
        method: 'post'
    })
}