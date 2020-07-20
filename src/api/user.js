//开发环境使用代理
// var url = process.env.NODE_ENV == 'development' ? '/login' : 'http://www.ecare.org.cn:4088/user';

import {get, post} from "../request/http";

//检查是否注册
export function isRegister(data) {
  return post(`/isRegister`, data);
}

//注册
export function register(data) {
  return post(`/register`, data);
}

//登录
export function login(data) {
  return post(`/login/web`, data);
}
