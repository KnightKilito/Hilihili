<template>
    <div>
        <el-form class="contact-form-1" ref="formValidate" :model="formValidate" :rules="ruleValidate" action="">
                <el-form-item label="用户名：" prop="username">
                    <div class="form-group">
                        <el-input type="text" name="username" placeholder="您的用户名"
                            v-model="formValidate.username" required />
                    </div>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <div class="form-group">
                        <el-input type="email" name="email" placeholder="您的邮件地址" v-model="formValidate.email"
                            required />
                    </div>
                    <el-button class="btn-default btn-large" :plain="true"
                        @click="sendEmail('formValidate')">发送验证码</el-button>
                </el-form-item>

            </el-form>

        <el-form class="contact-form-1" ref="formUser" :model="formUser" :rules="rulePwd" action="">

            <el-form-item label="验证码：" prop="verifyCode">
                <div class="form-group">
                    <el-input type="text" name="verifyCode" placeholder="验证码" v-model="formUser.verifyCode" required />
                </div>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <div class="form-group">
                    <el-input type="password" name="password" placeholder="密码"
                        v-model="formUser.password" required />
                </div>
            </el-form-item>

            <el-form-item label="确认密码：" prop="againPassword">
                <div class="form-group">
                    <el-input type="password" name="confirm_password" placeholder="确认密码"
                        v-model="formUser.againPassword" required />
                </div>
            </el-form-item>


        </el-form>

        <div class="form-group">
            <div class="button-group">
                <el-button class="btn-default btn-large" :plain="true"
                    @click="updatePwd('formUser')">更新密码</el-button>
                <el-button class="btn-default btn-large btn-border" :plain="true"
                    @click="handleReset('formUser')">清空密码</el-button>
            </div>
        </div>

        <div class="form-group" v-html="showResult ? result : null" />
    </div>
</template>

<script>
import Icon from "../../icon/Icon";
import { validateEMail, validateUsername, validatePhone } from "../../utils/Validate"
// import { serverUrl } from "../../utils/serverurl"


export default {
    name: 'ForgetPwd',
    components: { Icon },
    data() {
        // 密码验证
        const pwdCheck = async (rule, value, callback) => {
            let reg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/;
            // let reg = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$%*-+=:,\?[]{}]).{6,16}$/
            if (value.length < 6) {
                this.changeFlag = 2;
                return callback(new Error('密码不能少于6位！'));
            } else if (value.length > 16) {
                this.changeFlag = 2;
                return callback(new Error('密码最长不能超过16位！'));
            } else if (!reg.test(value)) {
                this.changeFlag = 2;
                return callback(new Error('6-16位字符，同时包括数字、大小写字母和特殊字符四种组合'));
            } else {
                this.changeFlag = 1;
                callback()
            }
        };
        // 重复密码验证
        const pwdAgainCheck = async (rule, value, callback) => {
            if (value.length < 1) {
                this.changeAgainFlag = 2;
                return callback(new Error('重复密码不能为空！'));
            } else if (this.formValidate.password != this.formValidate.againPassword) {
                this.changeAgainFlag = 2;
                return callback(new Error('两次输入密码不一致！'));
            } else {
                this.changeAgainFlag = 1;
                callback()
            }
        };
        return {
            verifyCode: '',
            showResult: false,
            result: `<p class="success-message">账号密码修改成功！请重新登录！</p>`,
            changeFlag: 0,
            changeAgainFlag: 0,
            formValidate: {
                username: '',
                email: '',
                // phone: '',
                // password: '',
                // againPassword: '',
                // identity: 'customer'
            },
            formUser:{
                verifyCode: '',
                username: '',
                email: '',
                password: '',
                againPassword: '',
            },
            ruleValidate: {
                username: [
                    { required: true, message: '请输入正确的用户名', trigger: 'blur' },
                    { validator: validateUsername, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入正确的邮箱', trigger: 'blur' },
                    { validator: validateEMail, trigger: 'blur' }
                ],
            },
            rulePwd: {
                verifyCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '6-16位字符，同时包括数字、大小写字母和特殊字符四种组合', trigger: 'blur' },
                    { validator: pwdCheck, trigger: 'blur' }
                ],
                againPassword: [
                    { required: true, message: '两次密码不一致', trigger: 'blur' },
                    { validator: pwdAgainCheck, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        sendEmail(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.showResult = true;
                    this.$notify({
                        title: '成功提交表单',
                        message: '格式正确',
                        type: 'success'
                    });
                    var formItems = this.formValidate;
                    // let url = serverUrl + "/user/register";
                    // console.log("url:" + url);
                    console.log(formItems);

                    //vue-resource this.$http.  {headers: {'Content-Type':'application/x-www-form-urlencoded'},} ,{emulateJSON:true}
                    //this.$axios.  this.$qs.stringify(formItems)
                    this.$axios.post("/user/pwd/sendCode", formItems).then(res => {
                        console.log(res);
                        if (res.data.state == 0) {
                            this.$notify({
                                type: 'success',
                                title: '成功获得服务器回应',
                                message: res.data.message
                            })
                        } else {
                            this.$notify.info({
                                title: '服务器消息',
                                message: res.data.message
                            });
                        }
                    })

                } else {
                    this.showResult = false;
                    this.$notify.error({
                        title: '错误',
                        message: '请检查表单格式'
                    });
                }
            })
        },
        updatePwd(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    
                    this.$notify({
                        title: '成功提交表单',
                        message: '格式正确',
                        type: 'success'
                    });
                    var formItems = {
                        username: this.formValidate.username,
                        email: this.formValidate.email,
                        password: this.formUser.password,
                        againPassword: this.formUser.againPassword
                    }
                    // let url = serverUrl + "/user/register";
                    // console.log("url:" + url);
                    console.log(formItems);

                    //vue-resource this.$http.  {headers: {'Content-Type':'application/x-www-form-urlencoded'},} ,{emulateJSON:true}
                    //this.$axios.  this.$qs.stringify(formItems)
                    this.$axios.put(`/user/pwd/forgetPassword/${this.formUser.verifyCode}`, formItems).then(res => {
                        console.log(res);
                        if (res.data.state == 0) {
                            this.$notify({
                                type: 'success',
                                title: '成功获得服务器回应',
                                message: res.data.message
                            })
                            this.showResult = true;
                            setTimeout(() => {

                                this.$router.push('/login');
                            }, '3000');
                        } else {
                            this.$notify.info({
                                title: '服务器消息',
                                message: res.data.message
                            });
                        }
                    })

                } else {
                    this.showResult = false;
                    this.$notify.error({
                        title: '错误',
                        message: '请检查表单格式'
                    });
                }
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