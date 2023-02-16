<template>
    <div class="rn-comment-form pt--60">
        <div class="inner">
            <div class="section-title">
                <!-- <span class="subtitle">Have a Comment?</span> -->
                <h2 class="title">视频投稿更新</h2>
            </div>
            <el-form :model="form" :rules="ruleValidate" ref="form" class="mt--40">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-12">
                        <el-form-item label="视频" prop="url">
                            <div class="rnform-group">
                                <el-upload class="upload-demo" :action="upVideoUrl" :show-file-list="true"
                                    :on-success="handleVideoSuccess" :limit="limitNum" :headers="headerObj"
                                    :on-remove="onRemoveVideo" :on-exceed="onExceed" drag>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                </el-upload>
                                <a v-if="videoUrl" :href="videoUrl">{{videoUrl}}</a>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="col-lg-6 col-md-12 col-12">
                        <el-form-item label="封面" prop="cover">
                            <div class="rnform-group">
                                <el-upload class="avatar-uploader" :action="upCoverUrl" :show-file-list="true"
                                    :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload"
                                    :limit="limitNum" :headers="headerObj" :on-remove="onRemoveCover"
                                    :on-exceed="onExceed">
                                    <img v-if="coverUrl" :src="coverUrl" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <a v-if="coverUrl" :href="coverUrl">{{coverUrl}}</a>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="col-lg-6 col-md-12 col-12">
                        <el-form-item label="标题：" prop="title">
                            <div class="rnform-group">
                                <el-input type="text" placeholder="Name" v-model="form.title" required />
                            </div>
                        </el-form-item>
                        <el-form-item label="原创：" prop="type">
                            <div class="rnform-group">
                                <el-switch v-model="original"></el-switch>
                            </div>
                        </el-form-item>
                        <el-form-item label="形式：" prop="form">
                            <div class="rnform-group">
                                <el-radio-group v-model="form.form">
                                    <!-- <el-radio label="仅我可见" value="self"></el-radio> -->
                                    <el-radio label="公开" value="public"></el-radio>
                                    <el-radio label="VIP可见" value="vip"></el-radio>
                                </el-radio-group>
                            </div>
                        </el-form-item>
                        <el-form-item label="参与活动" prop="activityID">
                            <div class="rnform-group">
                                <el-select v-model="form.activityID" placeholder="请选择视频活动">
                                    <el-option v-for="actTag in actTagList" :key ="actTag.tid"
                                        v-bind:label="actTag.tagName"
                                        v-bind:value="actTag.tid"></el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="col-lg-6 col-md-12 col-12">
                        <el-form-item label="简介：" prop="intro">
                            <div class="rnform-group">
                                <el-input type="textarea" placeholder="视频简介" v-model="form.intro"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="视频分区" prop="region">
                            <div class="rnform-group">
                                <el-select v-model="form.region" placeholder="请选择视频分区">
                                    <el-option label="动漫区" value="animation"></el-option>
                                    <el-option label="舞蹈区" value="dance"></el-option>
                                    <el-option label="科技区" value="tec"></el-option>
                                    <el-option label="影视区" value="movie"></el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                        <el-form-item label="视频标签" prop="tags">
                            <div class="rnform-group">
                                <el-checkbox-group v-model="videoTags">
                                    <el-checkbox-button v-for="tag in tagList" :key ="tag.tid"
                                        v-bind:label="tag.tagName"
                                        v-bind:value="tag.tid" name="type"></el-checkbox-button>
                                </el-checkbox-group>
                            </div>
                            <div class="rnform-group">
                                <el-pagination small @size-change="handleSizeChangeTags"
                                    @current-change="handleCurrentChangeTags" :current-page="currentPageTags"
                                    :page-sizes="[3, 5, 8, 10]" :page-size="pageSizeTags"
                                    layout="total, sizes, prev, pager, next, jumper" :total="allTags">
                                </el-pagination>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="col-lg-12">
                        <div class="blog-btn">
                            <el-button class="btn-default btn-large" :plain="true"
                                @click="submit('form')">确认更新投稿</el-button>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>

import { getCookie } from '../../utils/cookieUtil'
import { uploadVideoUrl } from '../../utils/serverurl'

export default {
    name: "UploadVideoDetail",
    data() {
        return {
            vid: this.$route.params.vid,
            original: false,
            upVideoUrl: uploadVideoUrl + '/video',
            upCoverUrl: uploadVideoUrl + '/cover',
            videoUrl: '',
            coverUrl: '',
            limitNum: 1,
            headerObj: {
                "token": getCookie("token")
            },
            form: {
                vid: null,
                title: '',
                url: '',
                cover: '',
                intro: '',
                region: '',
                type: '',// 原创、转载
                form: '',// 仅我可见、公开、VIP可见
                username: '',
                activityID: null,
                tags: ''
            },
            ruleValidate: {
                url: [
                    { required: true, message: '请上传视频!', trigger: 'change' }
                ],
                cover: [
                    { required: true, message: '请上传视频封面!', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请输入标题', trigger: 'change' }
                ],
                region: [
                    { required: true, message: '请选择视频分区', trigger: 'change' }
                ],
                form: [
                    { required: true, message: '请选择视频形式', trigger: 'change' }
                ],
            },
            allTags: 0,
            tagList: [],
            actTagList: [],
            videoTags: [],
            currentPageTags: 1,
            pageSizeTags: 3,
        };
    },
    mounted() {
        this.checkLogin();
        this.getTagList();
        this.getVideoDetail();
    },
    methods: {
        checkLogin() {
            var loginUsername = getCookie("username");
            if (loginUsername.length != 0) {
                this.form.username = loginUsername;
                this.headerObj = {
                    "token": getCookie("token")
                }
            } else {
                this.$notify.error({
                    title: '当前未登录',
                    message: '即将跳转登录页面'
                });
                setTimeout(() => {
                    // 跳转去登录页面
                    // console.log('跳转去登录页面');
                    this.$router.push('/login');
                }, '3000');

            }
        },
        getVideoDetail(){
            this.$axios.get(`/video/upload/${this.vid}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.form = res.data.data;
                    this.videoTags= this.form.tags.split(',');
                    this.coverUrl = this.form.cover;
                    this.videoUrl = this.form.url;
                    if(this.form.type == 'original'){
                        this.original = true;
                    }else{
                        this.original = false;
                    }
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
        submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    
                    if (this.original) {
                        this.form.type = 'original';
                    } else {
                        this.form.type = 'reprint';
                    }
                    var tagText = '';
                    for (var i = 0; i < this.videoTags.length; i++) {
                        console.log(this.videoTags[i]);
                        if(i >= 1){
                            tagText += ',';
                        }
                        tagText += this.videoTags[i];
                    }
                    console.log(tagText);
                    this.form.tags = tagText;
                    this.$notify({
                        title: '成功提交表单',
                        message: '格式正确',
                        type: 'success'
                    });
                    var formItems = this.form;
                    console.log(formItems);
                    this.$axios.put("/video", formItems).then(res => {
                        console.log(res);
                        if (res.data.state == 0) {
                            this.$notify({
                                type: 'success',
                                title: '成功获得服务器回应',
                                message: res.data.message
                            });
                            this.$notify({
                                type: 'success',
                                title: '请前往稿件管理标签页查看',
                                message: '视频信息更新成功，无需重复更新'
                            });
                            // 跳转去视频管理页面
                            setTimeout(() => {
                                this.$router.push("/upload");
                            }, '2000');
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
        // ==========上传封面==========
        // 因为是组件自己的方法，所以所有axios的过滤什么的都得重新写一遍……主要是因为自定义http request要加的参数太多了
        handleCoverSuccess(res, file) {
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
                this.form.cover = res.data;
            }
            this.coverUrl = URL.createObjectURL(file.raw);
        },
        onRemoveCover(file, fileList) {
            // 先替换修改框头像为原始
            this.coverUrl = null;
            // TODO 再删除七牛云上的图片
        },
        beforeCoverUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG 和 PNG 格式！');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB！');
            }
            return (isJPG || isPNG) && isLt2M;
        },
        onExceed(files, fileList) {
            this.$notify.info({
                title: '上传数量超出！',
                message: '请先删除已上传的文件再上传新的！'
            });
        },
        // ==========上传视频==========
        handleVideoSuccess(res, file) {
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
                this.form.url = res.data;
            }
            this.videoUrl = URL.createObjectURL(file.raw);
        },
        onRemoveVideo(file, fileList) {
            // 先替换修改框头像为原始
            this.videoUrl = null;
            // TODO 再删除七牛云上的图片
        },

        // ==========标签部分==========
        getTagList() {
            this.$axios.get(`/video/tag/notAct/${this.currentPageTags}/${this.pageSizeTags}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.tagList = res.data.datas;
                    this.allTags = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
            this.$axios.get(`/video/tag/isAct`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.actTagList = res.data.datas;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
        // ==========分页用==========
        handleSizeChangeTags(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeTags = val;
            this.getTagList();
        },
        handleCurrentChangeTags(val) {
            console.log(`当前页: ${val}`);
            this.currentPageTags = val;
            this.getTagList();
        }
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
    width: 250px;
    height: 178px;
    display: block;
    border-radius: 6px;
}
</style>
