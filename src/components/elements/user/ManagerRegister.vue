<template>
    <el-form class="contact-form-1" ref="formValidate" :model="formValidate" :rules="ruleValidate" action="">
        <el-form-item label="用户名：" prop="username">
            <div class="form-group">
                <el-input type="text" name="username" placeholder="Your UserName" v-model="formValidate.username"
                    required />
            </div>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
            <div class="form-group">
                <el-input type="text" name="nickname" placeholder="Your Nickname" v-model="formValidate.nickname"
                    required />
            </div>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
            <div class="form-group">
                <el-input type="email" name="email" placeholder="Email Address" v-model="formValidate.email" required />
            </div>
        </el-form-item>

        <el-form-item label="手机号：" prop="phone">
            <div class="form-group">
                <el-input type="text" name="phone" placeholder="Phone Number" v-model.number="formValidate.phone"
                    required />
            </div>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
            <div class="form-group">
                <el-input type="password" name="password" placeholder="Your Password" v-model="formValidate.password"
                    required />
            </div>
        </el-form-item>

        <el-form-item label="确认密码：" prop="againPassword">
            <div class="form-group">
                <el-input type="password" name="confirm_password" placeholder="Confirm Password"
                    v-model="formValidate.againPassword" required />
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
                <el-button class="btn-default btn-large" :plain="true"
                    @click="sendEmail('formValidate')">现在注册</el-button>
                <el-button class="btn-default btn-large btn-border" :plain="true"
                    @click="handleReset('formValidate')">清空表单</el-button>
            </div>
        </div>

        <div class="form-group" v-html="showResult ? result : null" />
    </el-form>
</template>

<script>
import Icon from "../../icon/Icon";
import { validateEMail, validateUsername, validatePhone } from "../../utils/Validate"
// import { serverUrl } from "../../utils/serverurl"


export default {
    name: 'ManagerRegister',
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
            showResult: false,
            result: `<p class="success-message">账号注册成功！</p>`,
            changeFlag: 0,
            changeAgainFlag: 0,
            formValidate: {
                username: '',
                email: '',
                phone: '',
                password: '',
                againPassword: '',
                identity: 'manager'
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
                phone: [
                    { required: true, message: '请输入正确的手机号', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' }
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
                    this.showResult = true;
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
                    this.$axios.post("/user/manage", formItems).then(res => {
                        console.log(res);
                        if (res.data.state == 0) {
                            this.$notify({
                                type: 'success',
                                title: '成功获得服务器回应',
                                message: res.data.message
                            })
                            setTimeout(() => {
                                // 跳转去首页等用户检查邮箱激活
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