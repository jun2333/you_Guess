import axios from "@/libs/api.request"

const submitDownload = (formData, id) => {
    let method = 'PUT',
        data = { ...formData, id };
    return axios.request({
        url: `/api/downloads/${id}`,
        method,
        data
    })
}

const createDownload = formData => {
    let method = 'POST',
        data = formData;
    return axios.request({
        url: '/api/downloads',
        method,
        data
    })
}

export const submitFileInfo = (formData, id = -1) => {
    if (id === -1) return createDownload(formData);
    else return submitDownload(formData, id);
}


export const requestFileDetail = id => {
    return axios.request({
        url: `/api/downloads/${id}`,
        method: 'GET',
    })
}
