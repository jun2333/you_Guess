import axios from 'axios'

class HttpRequest {
    constructor(baseUrl = baseUrl) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            withCredentials: true,
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // },
            transformRequest: [function transformRequest(data, haeders) {
                if (data) {
                    let keys = Object.keys(data);
                    /* 这里就是把json变成url形式，并进行encode */
                    return encodeURI(keys.map(name => `${name}=${data[name]}`).join('&'));
                }
            }]
        }
        return config
    }
    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {

        }
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            const token = window.localStorage.getItem("token");
            if (token) {
                // 判断是否存在token，如果存在的话，则每个http header都加上token
                // Bearer是JWT的认证头部信息
                config.headers.common["Authorization"] = "Bearer " + token;
            }
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const {code, data, status } = res;
            if(data.code ==='1004'||status ==='401') {
                location.href = '/login'
            }
            return data
        }, error => {
            this.destroy(url)
            return Promise.reject(error)
        })
    }
    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
