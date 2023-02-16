<template>
    <div>
        <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="60%" :before-close="handleClose"
            :append-to-body="true" :modal="true" >
            <el-form :model="form" :rules="rules" ref="form" >
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-12">

                        <el-form-item label="头像" prop="avatar">
                            <img style="width:150px;height:150px" :src="form.avatar" />
                            <el-upload class="avatar-uploader" :action="upAvatarUrl" :show-file-list="true"
                                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :limit="limitNum"
                                :headers="headerObj" :on-remove="onRemoveFile" :on-exceed="onExceed">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="col-lg-6 col-md-12 col-12">
                        <el-form-item label="空间背景图（会员才可以修改哦）" prop="userBg">
                            <img style="width:150px;height:150px" :src="form.userBg" />
                            <el-upload class="avatar-uploader" :action="upUserBgUrl" :show-file-list="true"
                                :on-success="handleUserBgSuccess" :limit="limitNum" :headers="headerObj"
                                :on-remove="onRemoveFileUserBg" :on-exceed="onExceed" :disabled="disableModifyUserBg">
                                <img v-if="userBgUrl" :src="userBgUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>

                    <div class="col-lg-6 col-md-12 col-12">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="form.username" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="form.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" :disabled="true"></el-input>
                            <router-link class="btn-default round btn-border btn-large" to="/activatemail">
                                更新邮箱
                            </router-link>
                        </el-form-item>
                    </div>
                    <div class="col-lg-6 col-md-12 col-12">
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="自我介绍" prop="selfInfo">
                            <el-input v-model="form.selfInfo"></el-input>
                        </el-form-item>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="handleClose">取 消</el-button>
                            <el-button type="primary" @click="submit('form')">提 交</el-button>
                        </span>
                    </div>

                </div>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
import { validateEMail, validatePhone } from "../../utils/Validate"
import { setCookie, getCookie, delCookie } from '../../utils/cookieUtil'
import { uploadAvatarUrl } from '../../utils/serverurl'

export default {
    name: "ModifyUserInfo",
    data() {
        return {
            disableModifyUserBg: true,
            upAvatarUrl: uploadAvatarUrl + '/userAvatar',
            upUserBgUrl: uploadAvatarUrl + '/userBg',
            dialogVisible: false,
            imageUrl: '',
            userBgUrl: '',
            limitNum: 1,
            headerObj: Object,
            form: {
                username: '',
                email: '',
                phone: '',
                nickname: '',
                selfInfo: '',
                avatar: '',
            },
            rules: {
                nickname: [
                    { required: true, message: "昵称不能为空", trigger: "blur" },
                ],
                email: [
                    { required: true, message: '请输入正确的邮箱', trigger: 'blur' },
                    { validator: validateEMail, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入正确的手机号', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' }
                ],
            },
        };
    },
    mounted() {
        this.load();
        this.checkIdentity();
    },
    methods: {
        open() {
            this.dialogVisible = true;
        },
        load() {
            this.headerObj = {
                "token": getCookie("token")
            }
            var routeUsername = this.$route.params.username;
            this.$axios.get("/user/username/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.form = res.data.data;
                    // this.form.email = res.data.data.email;
                    // this.form.phone = res.data.data.phone;
                    // this.form.nickname = res.data.data.nickname;
                    // this.form.selfInfo = res.data.data.selfInfo;
                    // this.form.avatar = res.data.data.avatar;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            })
        },
        submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.showResult = true;
                    this.$notify({
                        title: '成功提交表单',
                        message: '格式正确',
                        type: 'success'
                    });
                    var formItems = this.form;
                    var routeUsername = this.$route.params.username;
                    this.$axios.put("/user/username/" + routeUsername, formItems).then(res => {
                        console.log(res);
                        if (res.data.state == 0) {
                            this.$notify({
                                type: 'success',
                                title: '成功获得服务器回应',
                                message: res.data.message
                            });
                            this.handleClose();
                            // 刷新头像在本地cookie的缓存
                            setCookie("avatar", this.form.avatar);
                            this.$router.go(0);
                        } else {
                            this.$notify.info({
                                title: '服务器消息:' + res.data.state,
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
        handleClose() {
            this.dialogVisible = false;
            this.$emit("flesh");
        },
        // 因为是组件自己的方法，所以所有axios的过滤什么的都得重新写一遍……主要是因为自定义http request要加的参数太多了
        handleAvatarSuccess(res, file) {
            // console.log(res);
            console.log(file);
            if (res.code == 116) {
                this.$notify.info({
                    title: res.message,
                    message: '3秒后跳去邮箱激活界面'
                });
                setTimeout(() => {
                    this.$router.push('/activatemail');
                }, '3000');

            } else if (res.state == 0) {
                this.form.avatar = res.data;
            }
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        onRemoveFile(file, fileList) {
            // 先替换修改框头像为原始
            this.form.avatar = getCookie("avatar");
            // TODO 再删除七牛云上的图片
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式！');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB！');
            }
            return isJPG && isLt2M;
        },
        onExceed(files, fileList) {
            this.$notify.info({
                title: '图片上传数量超出！',
                message: '请先删除已上传的图片再上传新的！'
            });
        },

        // ========空间背景图片上传=====
        checkIdentity() {
            var identity = getCookie("identity");
            console.log(identity);
            if (identity == 'vip' || identity == 'vvip') {
                console.log(this.disableModifyUserBg);
                this.disableModifyUserBg = false;
            }
        },
        beforeUserBgUpload(file) {
            setCookie("userBg", this.form.userBg);
            return true;
        },
        handleUserBgSuccess(res, file) {
            console.log(res);
            console.log(file);
            if (res.code == 116) {
                this.$notify.info({
                    title: res.message,
                    message: '3秒后跳去邮箱激活界面'
                });
                setTimeout(() => {
                    this.$router.push('/activatemail');
                }, '3000');

            } else if (res.state == 0) {
                this.form.userBg = res.data;
            }
            this.userBgUrl = URL.createObjectURL(file.raw);
        },
        onRemoveFileUserBg(file, fileList) {
            // 先替换修改框头像为原始
            this.form.userBg = getCookie("userBg");
            delCookie("userBg");
            // TODO 再删除七牛云上的图片
        },
    },
};
</script>

<style scoped>
.updateinfo {
    height: 350px;
    overflow: auto;
}

.left {
    /* width: 330px; */
    float: left;
}

.right {
    overflow: hidden;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
