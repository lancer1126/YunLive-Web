import request from "@/utils/request"

export const getRecommend = (page, size) => request({
    url: '/api/live/rec',
    method: 'GET',
    params: {
        page: page,
        size: size
    }
})
