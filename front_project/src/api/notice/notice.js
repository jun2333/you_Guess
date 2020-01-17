import axios from "@/libs/api.request"


export const getNoticeList = params => {
    return axios.request({
        url: '/api/back/notice/getNoticeList',
        method: 'GET',
        params: params,
    })
}

export const getNoticeDetail = noticeId => {
    return axios.request({
        url: '/api/back/notice/getNoticeDetail',
        method: 'GET',
        params: { noticeId },
    })
}


export const addNotice = ({ contentJson, noticeType, des, url, version }) => {
    return axios.request({
        url: '/api/back/notice/addNotice',
        method: 'POST',
        data: {
            contentJson,
            noticeType,
            des,
            url,
            version
        }
    })
}

export const modNotice = ({ noticeId, contentJson, noticeType, des, url, version }) => {
    return axios.request({
        url: '/api/back/notice/modNotice',
        method: 'PUT',
        data: {
            noticeId,
            contentJson,
            noticeType,
            des,
            url,
            version
        }
    })
}

export const pubNotice = params => {
    return axios.request({
        url: '/api/back/notice/pubNotice',
        method: 'PUT',
        data: params,
    })
}

export const offNotice = noticeId => {
    return axios.request({
        url: '/api/back/notice/offNotice',
        method: 'PUT',
        data: { noticeId }
    })
}

