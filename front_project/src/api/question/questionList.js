import axios from "@/libs/api.request"

export const getQuestionList = (id, page, limit) => {
    return axios.request({
        url: '/api/questions',
        method: 'GET',
        params: {
            id,
            page,
            limit
        }
    })
}
export const changeStatus = (id, status = 0) => {//0是上架
    status = status === 0 ? 1 : 0;
    let option = {
        url: `/api/question/status/${id}`,
        method: 'PUT',
        params: { status }
    }
    return axios.request(option)
}
export const deleteQuestion = id => {
    return axios.request({
        url: `/api/questions/${id}`,
        method: 'DELETE',
    })
}
export const editOrder = (id, order) => {
    return axios.request({
        url: `/api/question/order/${id}`,
        method: 'PUT',
        params: {
            order
        }
    })
}
