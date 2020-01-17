import axios from "@/libs/api.request"

export const uploadImage = imgFile => {
    console.log(1)
    return axios.request({
        url: '/api/back/upload/image',
        method: 'POST',
        data: {
            file: imgFile
        },
        transformRequest: [function (data) {
            // data = Qs.stringify(data)
            return data
        }],
        // params: {
        //     file: imgFile
        // },
        // data: imgFile,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

const submitQuestion = (formData, id) => {
    let method = 'PUT',
        data = { ...formData, id };
    return axios.request({
        url: `/api/questions/${id}`,
        method,
        data
    })
}

const createQuestion = formData => {
    let method = 'POST',
        data = formData;
    return axios.request({
        url: '/api/questions',
        method,
        data
    })
}

export const submitquestion = (formData, id = -1) => {
    if (id === -1) return createQuestion(formData);
    else return submitQuestion(formData, id);
}


export const requestQuestionDetail = id => {
    // console.log(1)
    return axios.request({
        url: `/api/questions/${id}`,
        method: 'GET'
    })
}
