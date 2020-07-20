import {post} from "../request/http";

//获取小区列表
export function getCommunityList(data) {
    return post(`/getCommunityList`, data);
}

//添加小区
export function createCommunity(data) {
    return post(`/createCommunity`, data);
}
