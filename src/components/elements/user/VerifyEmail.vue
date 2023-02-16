<template>
    <div class="error-inner">
        <!-- <h1>邮箱激活</h1> -->
        <h2 class="title">{{ title }}</h2>
        <h3 class="description">{{ message }}</h3>
        <p class="description">若邮箱有误，请前往更新邮箱</p>
        <div class="button-group mt--30" data-aos="fade-up" data-aos-delay="150">
            <router-link class="btn-default round btn-border btn-large" to="/activatemail">
                更新邮箱
            </router-link>
        </div>
    </div>
</template>


<script>
import Icon from '../../icon/Icon'
import Button from '../button/Button'
import { setCookie, getCookie, delCookie } from '../../utils/cookieUtil'

export default {
    name: 'VerifyEmail',
    components: { Button, Icon, setCookie, getCookie },
    data() {
        return {
            title: '',
            message: '',
        }
    },
    mounted: function () {
        this.getInfo();
    },
    methods: {
        getInfo() {
            var token = this.$route.params.token;
            var url = '/user/emailVerify/' + token;
            this.$axios.get(url).then(res => {
                console.log(res);
                this.title = res.data.data.state;
                this.message = res.data.data.message;
                if (res.data.data.state == 0 || res.data.data.state == 122) {

                    this.$notify({
                        type: 'success',
                        title: '邮箱验证成功',
                        message: '5秒后跳去登录页面重新登录'
                    });
                    if (getCookie("username")) {
                        setTimeout(() => {
                            // 跳转去登录页面
                            delCookie("token");
                            delCookie("username");
                            delCookie("identity");
                            this.$router.push('/login');
                        }, '5000');

                    } else {
                        setTimeout(() => {
                            // 跳转去登录页面
                            this.$router.push('/login');
                        }, '5000');
                    }

                } else {
                    this.$notify.info({
                        title: '服务器消息' + res.data.data.state,
                        message: res.data.data.message
                    });
                }
            })
        },


    }
}
</script>