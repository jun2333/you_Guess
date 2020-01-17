import axios from "@/libs/api.request"


export const getMessageList = params => {
    return axios.request({
        url: '/api/back/feedback/feedbackList',
        method: 'GET',
        params: params,
    })
}

export const modDealStatus = id => {
    return axios.request({
        url: '/api/back/feedback/modDealStatus',
        method: 'PUT',
        params: { id },
    })
}


export const addReply = ({ feedbackId, type, title, content, url }) => {
    return axios.request({
        url: '/api/back/reply/addReply',
        method: 'POST',
        data: {
            feedbackId,
            type,
            title,
            content,
            url
        }
    })
}



