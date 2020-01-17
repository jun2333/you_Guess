import axios from "@/libs/api.request";

export const getCategory = (type, lang) => {
    let url = '/api/category/' + type
    return axios.request({
        url,
        params: {
            lang
        },
        method: 'GET'
    })
}

export const deleteCategory = (id, type) => {
    let url = '/api/category/' + type;
    return axios.request({
        url,
        method: 'DELETE',
        params: {
            id
        }
    })
}

export const submitCategory = ({ id, lang, value, order, iconfocus, iconblur }, type, isEdit) => {
    let url = '/api/category/' + type;
    return axios.request({
        url,
        method: isEdit ? 'PUT' : 'POST',
        params: isEdit ? { id, lang, value, order, iconfocus, iconblur } : { lang, value, order, iconfocus, iconblur }
    })
}

export const editOrder = (id, order) => {
    return axios.request({
        url: '/api/categoryOrder',
        method: 'PUT',
        data: {
            id,
            order
        }
    })
}
