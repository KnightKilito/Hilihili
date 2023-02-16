import axios from 'axios';
import { Notification } from 'element-ui';
import { setCookie, getCookie, delCookie } from '../utils/cookieUtil'
import router from '../../router/index'
// import serverUrl from '../utils/serverurl' // 识别不到。。。

// 创建axios请求实例,并暴
const myaxios = axios.create({
    baseURL: 'http://localhost:8889',
    timeout: 2000,
    headers: {
        // 'X-Custom-Header': 'foobar',
        // 'Access-Control-Allow-Headers' : 'token'
    }
});

//配置全局的超时时长
myaxios.defaults.timeout = 2000;
//配置全局的基本URL
myaxios.defaults.baseURL = 'http://localhost:8889';

myaxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// myaxios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
myaxios.defaults.headers.get['Content-Type'] = 'application/json';
let loadingInstance; //创建Loading 的实例
// axios.defaults.baseURL = appConfig.xhr.baseURL; // 配置axios请求的地址
myaxios.defaults.crossDomain = true;
myaxios.defaults.withCredentials = false;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// myaxios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization
// myaxios.defaults.headers.common={};

//配置发送请求前的拦截器 可以设置token信息 
// http request 拦截器
myaxios.interceptors.request.use(
    config => {
        //config.data = JSON.stringify(config.data);
        //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
        if (getCookie("token")) {
            // console.log("cookie里的token:" + getCookie("token"));
            //用户每次操作，都重新计算cookie过期时间
            setCookie("token", getCookie("token"));
            setCookie("username", getCookie("username"));
            setCookie("identity", getCookie("identity"));
            // config.headers.Authorization = getCookie("token");
            // config.headers['token'] = getCookie("token");
            config.headers.token = getCookie("token");
            // config.headers.username = getCookie("username");
        } else {
            console.log("cookie里无token");
            // window.location.href='/login'
        }

        return config;
    },
    error => {
        loadingInstance.close();
        Notification.error({
            title: '错误',
            message: error.response
        });
        return Promise.reject(error.response)   // 返回接口返回的错误信息
        // return;
    }
);
myaxios.interceptors.response.use(
    (res) => {
        console.log("===axios拦截器===");
        console.log(res);
        if (res.data.code == 108 || res.data.state == 108) {
            // 无token，未登录
            Notification.error({
                title: '当前未登录',
                message: '即将跳转登录页面'
            });
            console.log("跳转登录页面");
            setTimeout(() => {
                // 跳转去激活邮箱页面
                window.location.href = '/login';
                return;
            }, '3000');
            return;
        } else if (res.data.code == 109) {
            console.log("用户登录过期");
            Notification.error({
                title: '用户登录过期',
                message: '即将跳转登录页面'
            });
            // 返回 错误代码-1 清除ticket信息并跳转到登录页面
            delCookie("token");
            delCookie("username");
            delCookie("identity");
            setTimeout(() => {
                
                window.location.href = '/login';
                return;
            }, '3000');
            return;
        } else if (res.data.code == 116 && router.currentRoute.name != 'ActivateMail') {
            Notification.error({
                title: '邮箱暂未激活',
                message: '3秒后跳转激活页面'
            });
            setTimeout(() => {
                // 跳转去激活邮箱页面
                window.location.href = '/activatemail';
                return;
            }, '3000');

        } else if (res.data.state == -1) {
            Notification.error({
                title: res.data.state,
                message: res.data.message
            });
            window.location.href = '/login';
            return;
        } else {

            return res;
        }

    },
    (error) => {
        console.log(error);
        Notification.error({
            title: '错误',
            message: error.response
        });
        return Promise.reject(new Error(error));
        // return error;
    }
);


//暴露接口
export default myaxios;