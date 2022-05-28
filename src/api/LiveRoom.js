import request from "@/utils/request"

export const getRecommend = (page, size) => request({
    url: '/api/live/rec',
    method: 'GET',
    params: {
        page: page,
        size: size
    }
})

export const getRoomInfo = (uid, platform, roomId) => request({
    url: '/api/live/roomInfo',
    method: 'GET',
    params: {
        uid: uid,
        p: platform,
        rid: roomId
    }
})

export const getRealUrl = (platform, roomId) => request({
    url: '/api/live/realUrl',
    method: 'GET',
    params: {
        p: platform,
        rid: roomId
    }
})
