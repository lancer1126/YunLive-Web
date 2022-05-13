import axios from "axios";
import {Message} from "@element-plus/icons-vue";
import router from '@/router/index'

const service = axios.create({
    timeout: 50000
})

service.interceptors.request.use(
    config => {
        if (localStorage.eleToken) {
            config.headers.Authorization = localStorage.eleToken
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    resp => {
        return resp
    },
    error => {
        const { status } = error.response
        if (status === 400) {
            Message.error('token无效，请重新登录')
            localStorage.removeItem('eleToken')
            router.push('/login').then(r => console.log(r))
        }
        return Promise.reject(error)


    }
)

export default service
