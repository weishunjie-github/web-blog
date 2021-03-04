import axios from 'axios'
import store from './store/index'
axios.defaults.baseURL = 'http://127.0.0.1:3000/';

export default function setAxios() {
    //请求拦截
    axios.interceptors.request.use(
        config => {
            if (store.state.token) {
                config.headers['Authorization'] = `Bearer ${store.state.token}`
                console.log(config)
            }
            return config
        }
    )
    //响应拦截
    axios.interceptors.response.use(
        response => {
            if (response) {
                if (response.data.status == "401") {
                    store.commit('delToken');
                    window.location.href = '#/login'
                    // window.routes.push({
                    //     path: '/login',

                    //     // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    // })
                }
            }
            console.log(response)

            return response
        }
    )
}