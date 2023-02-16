import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/scss/bootstrap.scss'
import 'animate.css'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import './assets/scss/style.scss'
import 'bootstrap'
import CoolLightBox from 'vue-cool-lightbox'
import VueScrollActive from 'vue-scrollactive'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueTypedJs from 'vue-typed-js'
// import axios from "axios"
import SlideVerify from 'vue-monoplasty-slide-verify' // 拼图验证码
import myaxios from '../src/components/utils/axios-init'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'



Vue.config.productionTip = false
Vue.prototype.$axios = myaxios
Vue.use(CoolLightBox)
Vue.use(VueScrollActive)
Vue.use(VueTypedJs)
Vue.use(ElementUI)
Vue.use(SlideVerify)
Vue.use(VueDPlayer)



new Vue({
  router,
  created() {
    AOS.init({
      duration: 800,
      once: true,
    })
  },
  render: h => h(App)
}).$mount('#app')


