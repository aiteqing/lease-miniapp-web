import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {getCookie} from "../request/cookie";

Vue.use(Vuex)
// http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzI2NTcyOTc1Mw==#wechat_redirect


// https://mp.weixin.qq.com/s?__biz=MzI2NTcyOTc1Mw==&mid=2247485536&idx=1&sn=a24a611934493cfda6297d558aa346f1&chksm=ea99abd6ddee22c007d2ec61354cd11eca7ebb83089b6c661fe9c36b90bfb20adbbc6f88aec9&sessionid=0&scene=126&subscene=0&clicktime=1594694497&enterid=1594694497&ascene=3&devicetype=android-29&version=2700103b&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&exportkey=AxX9xbXiL%2FOssdQcAf1VwZk%3D&pass_ticket=4z8x11v%2FpCP%2Biw3EAd5LaOx2T17JLpgGRx6v%2FAgWrbLul0zk423uNXluT%2FGlsVRH&wx_header=1
export default new Vuex.Store({
    state: {
        userUid: window.localStorage.getItem('userUid'),
        userPhone: window.localStorage.getItem('userPhone'),
        userPassword: window.localStorage.getItem('userPassword'),
        getRouter: []
    },
    plugins: [createPersistedState()]
})
