<template>
    <div class="error-inner">
        <!-- <h1>邮箱激活</h1> -->
        <h2 class="title">您的邮箱暂未激活，请在邮箱激活成功后重新登录！</h2>
        <h3 class="description">用户名：{{ username }} 邮箱：{{ email }}</h3>
        <p class="description">若邮箱有误，请输入新的邮箱地址，点击右侧按钮更新后再点击激活按钮</p>
        <el-form class="contact-form-1" ref="formValidate" :model="formValidate" :rules="ruleValidate" action="">
            <el-form-item label="邮箱：" prop="newEmail">
                <el-input type="email" placeholder="Your new email..." v-model="formValidate.newEmail" required />
                <el-button @click="updateEmail('formValidate')" class="search-button">
                    <Icon name="arrow-right" size="20" />
                </el-button>
            </el-form-item>

        </el-form>
        <div class="view-more-button">
            <el-button class="btn-default btn-large" :plain="true" @click="sendEmail">现在激活
            </el-button>
        </div>
    </div>
</template>


<script>
import Icon from '../../icon/Icon'
import Button from '../button/Button'
import { setCookie, getCookie } from '../../utils/cookieUtil'
import { validateEMail } from "../../utils/Validate"

export default {
    name: 'ActivateMail',
    components: { Button, Icon, setCookie, getCookie },
    data() {
        return {
            username: '',
            email: '',
            formValidate: {
                newEmail: '',
            },
            ruleValidate: {
                email: [
                    { required: true, message: '请输入正确的邮箱', trigger: 'blur' },
                    { validator: validateEMail, trigger: 'blur' }
                ]
            }
        }
    },
    mounted: function () {
        this.getInfo();
    },
    methods: {
        getInfo() {
            var username = getCookie("username");
            if (username == null || username.length == 0) {
                this.$notify.info({
                    title: '请登录后再从个人中心资料处来修改邮箱',
                    message: '3秒后跳转登录界面'
                });

                setTimeout(() => {
                    // 跳转去首页等用户检查邮箱激活
                    this.$router.push('/login');
                }, '3000');
            } else {
                this.$axios.get("/user/username/" + username).then(res => {
                    console.log(res);
                    if (res.data.state == 0) {
                        this.username = res.data.data.username;
                        this.email = res.data.data.email;
                    }
                })
            }

        },
        sendEmail() {
            var username = getCookie("username");
            this.$axios.post("/user/sendEmail/" + username).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.getInfo();
                    this.$notify({
                        type: 'success',
                        title: '成功获得服务器回应',
                        message: res.data.message
                    });
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },
        updateEmail(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.showResult = true;
                    this.$notify({
                        title: '成功提交表单',
                        message: '格式正确',
                        type: 'success'
                    });
                    this.$axios.put("/user/updateEmail/" + this.username + "/" + this.formValidate.newEmail).then(res => {
                        console.log(res);
                        if (res.data.state == 0) {
                            this.getInfo();
                            this.$notify({
                                type: 'success',
                                title: '成功获得服务器回应',
                                message: res.data.message
                            });
                        } else {
                            this.$notify.info({
                                title: '服务器消息',
                                message: res.data.message
                            });
                        }
                    })

                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请检查表单格式'
                    });
                }
            })
        },


    }
}
</script>