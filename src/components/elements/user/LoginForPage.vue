<template>
    <el-form class="contact-form-1" ref="formValidate" :model="formValidate" action="">
        <el-form-item label="用户名：" prop="username">
            <div class="form-group">
                <el-input type="text" name="username" placeholder="您的用户名" v-model="formValidate.username"
                    required />
            </div>
        </el-form-item>


        <el-form-item label="密码：" prop="password">
            <div class="form-group">
                <el-input type="password" name="password" placeholder="您的密码" v-model="formValidate.password"
                    required />
            </div>
        </el-form-item>

        <!-- <div class="form-group">
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required>
                </textarea>
        </div> -->

        <div class="form-group">
            <div class="button-group">
                <el-button class="btn-default btn-large" :plain="true" @click="showSlide">登录</el-button>
                <el-button class="btn-default btn-large btn-border" :plain="true"
                    @click="handleReset('formValidate')">清空</el-button>

                <a class="btn-default btn-large btn-border" href="/forgetpwd">
                    忘记密码
                </a>

            </div>
        </div>

        <el-dialog title="验证码" :visible.sync="dialogSlideVisible" :modal="true" :append-to-body="true" width="20%"
            style="text-align: center;">
            <SlideVerifyVue ref="childSlide" />
        </el-dialog>

    </el-form>
</template>

<script>
import Icon from "../../icon/Icon";
import { setCookie } from '../../utils/cookieUtil'
import SlideVerifyVue from './SlideVerify.vue'

export default {
    name: 'LoginForPage',
    components: { Icon, SlideVerifyVue },
    data() {

        return {
            dialogSlideVisible: false,
            changeFlag: 0,
            changeAgainFlag: 0,
            formValidate: {
                username: '',
                password: '',
            },
            // oldUrl: '',
        }
    },
    //     beforeRouteEnter (to, from, next){
    //      next(vm => {
    //        // 通过 `vm` 访问组件实例,将值传入oldUrl
    //        vm.oldUrl = from.path
    //        console.log(vm.oldUrl);
    //      })
    //    },
    mounted() {
        console.log(this.$router);
    },
    methods: {
        showSlide() {
            this.dialogSlideVisible = true;
            // 虽然可以做到每次点击登录按钮都刷新图片，但是控制台报错
            // this.$refs.childSlide.handleClick();
        },
        login() {
            this.$axios.post("/user/login", this.formValidate).then(res => {
                console.log(res);
                if (res.data.state == 200) {
                    this.$notify({
                        type: 'success',
                        title: '成功获得服务器回应',
                        message: res.data.message
                    });
                    setCookie("token", res.data.data.token);
                    setCookie("username", res.data.data.username);
                    setCookie("avatar", res.data.data.avatar);
                    setCookie("identity", res.data.data.identity);
                    // console.log("cookie里的token:"+getCookie("token"));
                    // this.hideLogin();
                    // Nav.showAvatar();
                    // console.log(this.oldUrl);
                    // if(this.oldUrl.includes('verifyEmail')){
                    //     this.$router.push('/home');
                    // }
                    // -1
                    this.$router.go(-1);
                    // this.$router.push('/home');
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
                // this.hideSlide();
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
            this.$notify({
                title: '成功',
                message: '清空完毕',
                type: 'success'
            });
        }
    }
}
</script>