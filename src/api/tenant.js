import {post} from "../request/http";

//获取租客列表
export function getTenantList(data) {
    return post(`/getTenantList`, data);
}

//添加租客
export function createTenant(data) {
    return post(`/createTenant`, data);
}
