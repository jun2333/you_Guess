import axios from "@/libs/api.request"

export const submitVideo = (data, isEdit = false) => {
    if (isEdit) {
        return axios.request({
            url: '/api/back/modvideo',
            method: 'PUT',
            params: data
        })
    } else {
        return axios.request({
            url: '/api/back/addvideo',
            method: 'POST',
            data
        })
    }
}

export const getVideoDetail = (id) => {
    return axios.request({
        url: '/api/back/videodetail',
        method: 'GET',
        params: {
            id
        }
    })
}

export const getVideoList = (lang, page, limit) => {
    return axios.request({
        url: '/api/back/videolist',
        method: 'GET',
        params: {
            lang,
            page,
            limit
        }
    })
}

export const changeStatus = (id, status) => {
    let option = {}
    if (status === 1) {
        option = {
            url: '/api/back/video/statusoff',
            method: 'DELETE',
            params: {
                id
            }
        }
    } else {
        option = {
            url: '/api/back/video/statuson',
            method: 'PUT',
            params: {
                id
            }
        }
    }
    return axios.request(option)
}

export const editOrder = (id, order) => {
    return axios.request({
        url: '/api/back/video/order',
        method: 'PUT',
        data: {
            id,
            order
        }
    })
}
