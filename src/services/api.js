import axios from 'axios'
import store from '../store'
import tokenService from './token.service'

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use((config) => {
    const token = tokenService.getLocalAccessToken()
    if (token) {
        config.headers['x-access-token'] = token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
    return res
}, async (error) => {
    const originalConfig = error.config
    if (originalConfig.url !== '/auth/signin' && error.response) {
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true
            try {
                const rs = await instance.post('/auth/refreshToken', {
                    refreshToken: tokenService.getLocalRefreshToken()
                })
                const {accessToken} = rs.data
                store.dispatch('refreshToken', accessToken)
                tokenService.updateLocalAccessToken(accessToken)
                return instance(originalConfig)
            } catch (_error) {
                return Promise.reject(_error)
            }
        }
    }
    return Promise.reject(error)
})

export default instance