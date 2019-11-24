import config from '../config'
import HttpRequest from './axios'
const axios = new HttpRequest(config.baseUrl)
export default axios