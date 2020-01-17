import axios from 'axios'
import store from '@/store'
import Qs from 'qs'
import { Message } from 'iview'
import router from '@/router'
import Cookies from 'js-cookie'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
    const { statusText, status, request: { responseURL } } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }
    if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            withCredentials: true,
            headers: {
                //
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: [function (data) {
                data = Qs.stringify(data)
                return data
            }]
        }
        return config
    }
    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const { data } = res
            if (data.code === 10103) {
                sessionStorage.clear();
                Cookies.remove('token');
                Message.error('登录超时,请重新登录!');
                router.push({
                    name: 'login'
                })
                return false
            } else if (data.status === 1) {
                return data
            } else {
                if (data.msg) {
                    Message.error(data.msg)
                } else {
                    Message.error('系统繁忙，请稍后重试！')
                }
                return false
            }
            // return data
        }, error => {
            this.destroy(url)
            // addErrorLog(errorInfo)
            return Promise.reject(error)
        })
    }
    request(options) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options);
    }
}
export default HttpRequest
