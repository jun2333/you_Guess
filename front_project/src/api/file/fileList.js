import axios from "@/libs/api.request"

export const getFileList = (id, page, limit) => {
    return axios.request({
        url: '/api/downloads',
        method: 'GET',
        params: {
            id,
            page,
            limit
        }
    })
}
export const changeStatus = (id, status) => {
    let option = {
        url: `/api/download/status/${id}`
    }
    let state = status === 1 ? 0 : 1;
    option.method = 'PUT'
    option.params = { status: state }
    return axios.request(option)
}

export const deleteFile = id => {
    return axios.request({
        url: `/api/downloads/${id}`,
        method: 'DELETE'
    })
}

export const editOrder = (id, order) => {
    return axios.request({
        url: `/api/download/order/${id}`,
        method: 'PUT',
        params: {
            order
        }
    })
}
