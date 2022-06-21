import request from "@/utils/request"

export const getRecommend = (page, size) => request({
    url: '/api/live/rec',
    method: 'GET',
    params: {
        page: page,
        size: size
    }
})

export const getRecommendByPlatform = (platform, page, size) => request({
    url: '/api/live/recByPlatform',
    method: 'GET',
    params: {
        p: platform,
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

export const getAreas = (platform) => request({
    url: '/api/live/areas',
    method: 'GET',
    params: {
        p: platform
    }
})

export const getRecByGroupArea = (platform, groupId, areaId, page) => request({
    url: '/api/live/recByGrpArea',
    method: 'GET',
    params: {
        p: platform,
        grpId: groupId,
        areaId: areaId,
        page: page
    }
})

