<template>
    <el-dialog title="用户登录" :visible.sync="dialogFormVisible" :modal="true" :append-to-body="true" width="30%"
        style="text-align: center;">
        <div class="demo-input-suffix">
            <div class="row">
                <div class="col-md-12 col-12">
                    <el-form :model="form">
                        <el-form-item :label-width="formLabelWidth" label="用户名">
                            
                            <el-input type="text" name="username" placeholder="您的用户名" v-model="form.username"
                                autocomplete="off" required></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="密 码">
                            
                            <el-input type="password" name="password" placeholder="您的密码" v-model="form.password"
                                autocomplete="off" required></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <a class="btn-default btn-border" href="/forgetpwd">
                忘记密码
            </a>
            <el-button class="btn-default btn-border" @click="dialogFormVisible = false">取 消</el-button>
            <el-button class="btn-default" type="primary" @click="showSlide">登 录</el-button>
        </div>
        <el-dialog title="验证码" :visible.sync="dialogSlideVisible" :modal="true" :append-to-body="true" width="30%"
            style="text-align: center;">
            <SlideVerifyVue ref="childSlide" />
        </el-dialog>
    </el-dialog>

</template>

<script>
import Icon from '../../icon/Icon'
import Button from '../button/Button'
import SlideVerifyVue from './SlideVerify.vue'
import { setCookie, getCookie } from '../../utils/cookieUtil'

export default {
    name: 'Login',
    components: { Button, Icon, SlideVerifyVue },
    data() {
        return {
            dialogTableVisible: false,
            dialogFormVisible: false,
            dialogSlideVisible: false,
            form: {
                username: '',
                password: ''
            },
            formLabelWidth: '100px'
        }
    },

    methods: {

        showSlide() {
            this.dialogSlideVisible = true;
            // 虽然可以做到每次点击登录按钮都刷新图片，但是控制台报错
            // this.$refs.childSlide.handleClick();
        },
        hideSlide() {
            this.dialogSlideVisible = false;
        },
        showLogin() {
            this.dialogFormVisible = true;
        },
        hideLogin() {
            this.dialogFormVisible = false;
        },
        login() {
            this.$axios.post("/user/login", this.form).then(res => {
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
                    // console.log(res.data.data.identity);
                    // console.log("cookie里的token:" + getCookie("token"));
                    this.hideLogin();
                    this.$parent.avatarUrl = res.data.data.avatar;
                    this.$parent.showAvatar();
                    this.$router.go(0);
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
                this.hideSlide();
            })
        },

    }
}
</script>