
const isProduction = process.env.NODE_ENV === 'production'

export default {
    baseUrl:isProduction?'http://localhost:3000':'/api'
}