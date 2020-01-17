import axios from "@/libs/api.request"

const queryQuestionCountInfo = id => {
    return axios.request({
        url: `/api/question_count/${id}`,
        method: 'GET'
    })
}

export { queryQuestionCountInfo }