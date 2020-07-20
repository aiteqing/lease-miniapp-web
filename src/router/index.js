import Vue from 'vue';
import Router from 'vue-router';
import Login from '../view/login';
import Index from '../view/index';
import createCommunity from '../view/community/createCommunity';


/**
 * 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
};

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            meta: {
                title: '登录'
            },
            component: Login
        },
        {
            path: '/',
            name: 'Index',
            meta: {
                title: '首页'
            },
            component: Index
        },
        {
            path: '/community',
            name: 'createCommunity',
            meta: {
                title: '添加小区'
            },
            component: createCommunity
        }
    ]
})
