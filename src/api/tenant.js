import {post} from "../request/http";

//获取租客列表
export function getTenantList(data) {
    return post(`/getTenantList`, data);
}

//获取租客详情
export function getTenantDetail(data) {
    return post(`/getTenantDetail`, data);
}

//添加租客
export function createTenant(data) {
    return post(`/createTenant`, data);
}

//更新租客
export function updateTenant(data) {
    return post(`/updateTenant`, data);
}

//删除租客
export function deleteTenant(data) {
    return post(`/deleteTenant`, data);
}
