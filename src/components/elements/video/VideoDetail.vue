<template>
    <div class="rn-blog-details-area">
        <div class="post-page-banner rn-section-gapTop">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 offset-lg-2">
                        <div class="content text-center">
                            <div class="page-title">
                                <h1 class="theme-gradient" v-html="video.title" />
                            </div>
                            <ul class="rn-meta-list">
                                <li>
                                    <Icon name="user" class="size-20" /> <router-link
                                        :to="`/space/${video.username}`">{{ video.uploader }}</router-link>
                                </li>
                                <li>
                                    <Icon name="calendar" class="size-20" /> {{ video.datetimeString }}
                                </li>
                                <li>
                                    <Icon name="play-circle" class="size-20" /> {{ video.views }}
                                </li>
                                <li>
                                    <Icon name="archive" class="size-20" /> {{ video.region }}
                                </li>
                                <li v-if="video.type == 'original'">
                                    <Icon name="slash" class="size-20" style="color: red;"/> 未经许可禁止转载
                                </li>
                            </ul>
                            <div class="thumbnail alignwide mt--60">
                                <d-player ref="player" id="player" :options="options"></d-player>
                                <!-- <img class="w-100 radius" :src="video.cover" :alt="video.title"> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="blog-details-content pt--60 rn-section-gapBottom">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 offset-lg-2">
                        <div class="content">
                            <p v-html="video.intro" />
                            <div class="category-meta">
                                <div class="button-group">
                                    <div class="blog-btn">
                                        <el-button class="btn-default btn-large rounded-player sm-size" :plain="true"
                                            @click="likeVideo">
                                            <span>
                                                <Icon name="thumbs-up" size="30" />
                                            </span>
                                        </el-button>
                                        <span class="text">{{ video.likevideo }}</span>
                                        <el-button class="btn-default btn-large rounded-player btn-border sm-size"
                                            :plain="true" @click="unlikeVideo">
                                            <span>
                                                <Icon name="thumbs-down" size="30" />
                                            </span>
                                        </el-button>
                                        <span class="text">{{ video.unlike }}</span>
                                    </div>

                                </div>
                            </div>
                            <div class="category-meta">
                                <span class="text">视频标签：</span>
                                <div class="tagcloud">
                                    <a v-bind:href="`/video/tag/${tag}`" v-for="tag in videoTags" :key="tag">{{
                                        tag
                                    }}</a>
                                </div>
                            </div>

                            <!-- Start Contact Form Area  -->
                            <div class="rn-comment-form pt--60">
                                <div class="inner">
                                    <div class="section-title">
                                        <span class="subtitle">想掰扯几句？</span>
                                        <h2 class="title">留下你的神论</h2>
                                    </div>
                                    <form class="mt--40">
                                        <div class="row">
                                            <div class=" col-md-12 col-12">

                                                <div class="rnform-group">
                                                    <textarea placeholder="神论将于此显现并告示众人" :disabled="showEdit" required
                                                        v-model="commentForm.context">

                                                    </textarea>
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <a class="btn-default btn-large" v-show="showEdit"
                                                    href="/login">前往登录</a>
                                                <el-button class="btn-default btn-large" :plain="true"
                                                    v-show="!showEdit" @click="upComment">发表评论</el-button>
                                            </div>
                                            <VideoComments ref="childComments" />
                                            <!-- <div class=" col-md-12 col-12" v-for="comment in comments"></div> -->
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- End Contact Form Area  -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../../../components/icon/Icon'
import Button from "../../../components/elements/button/Button"
import BlogPostMixin from '../../..//mixins/BlogPostMixin'
import { getCookie } from '../../utils/cookieUtil'
import VideoComments from '../../elements/video/VideoComments'

export default {
    name: 'VideoDetail',
    components: {
        Icon,
        Button,
        VideoComments
    },
    mixins: [BlogPostMixin],
    data() {
        return {
            vid: this.$route.params.vid,
            username: getCookie("username"),
            // post: {},
            video: {},
            videoTags: [],
            showEdit: true,

            commentForm: {
                username: getCookie("username"),
                context: '',
                vid: this.$route.params.vid,
            },

            options: {
                container: document.getElementById("dplayer"), //播放器容器
                mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
                theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
                loop: false, // 是否自动循环
                lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
                screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
                hotkey: true, // 是否支持热键，调节音量，播放，暂停等
                preload: "auto", // 自动预加载
                volume: 0.7, // 初始化音量
                playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
                logo:
                    "https://hilihili-resource.moechun.fun/default/logo.png", // 在视频左上角上打一个logo
                video: {
                    url: "",
                    // "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4", // 播放视频的路径
                    // quality: [
                    //     // 设置多个质量的视频
                    //     {
                    //         name: "高清",
                    //         url:
                    //             "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                    //         type: "auto" // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
                    //     },
                    //     {
                    //         name: "标清",
                    //         url:
                    //             "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                    //         type: "auto"
                    //     }
                    // ],
                    // defaultQuality: 0, // 默认是高清
                    pic: "",
                    // "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg", // 视频封面图片
                    // thumbnails:
                    //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg" // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
                },
                // subtitle: {
                //   //字幕
                //   url: "", //字幕网址
                //   color: "#fff", //字幕颜色
                //   fontSize: "20px",
                //   bottom: "40px"
                // },
                // danmaku: {
                //     // 弹幕
                //     id: "9E2E3368B56CDBB4",
                //     api: "https://api.prprpr.me/dplayer/",
                //     token: "tokendemo", //后端验证令牌
                //     maximum: 1000, //弹幕最大数量
                //     addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"], //其他弹幕
                //     user: "DIYgod", //弹幕用户名
                //     bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
                //     unlimited: true //即使弹幕重叠也显示所有弹幕
                // },
                contextmenu: [
                    //  自定义上下文菜单
                    // 右键菜单
                    {
                        text: "hilihili首页",
                        link: "https://www.bilibili.com"
                    },
                    {
                        text: "闪闪の小窝",
                        link: "https://moechun.fun/"
                    },
                    {
                        text: "控制台打印播放器",
                        click: player => {
                            console.log(player);
                        }
                    }
                ],
                highlight: [
                    //进度条上的自定义时间标记
                    // 进度条时间点高亮
                    {
                        text: "10M",
                        time: 6
                    },
                    {
                        text: "20M",
                        time: 12
                    }
                ]
            }

        }
    },
    mounted() {
        // this.getPost(this.id);
        this.getVideoDetail();
        this.setCommentDisable();

        // 以下为隐藏一些作者的信息和视频播放源 如不需要可删除
        // document.querySelector(".dplayer-menu").remove(); //隐藏右键菜单
        document.querySelector(".dplayer-mask").remove();
        document.querySelector(".dplayer-info-panel-item-url").remove(); //隐藏播放源
        let length = document.querySelectorAll(".dplayer-menu-item").length;
        document.querySelectorAll(".dplayer-menu-item")[length - 1].remove(); // 去掉作者信息
        document.querySelectorAll(".dplayer-menu-item")[length - 2].remove(); // 去掉作者信息
    },
    created() {
        // this.getVideoDetail();
        // this.setVideo();
    },
    methods: {
        setCommentDisable() {
            if (this.username == null || this.username.length == 0) {
                this.showEdit = true;
            } else {
                this.showEdit = false;
            }
        },
        getVideoDetail() {

            this.$axios.get(`/video/videoDTO/${this.vid}`).then(res => {
                // console.log(res);
                if (res.data.state == 0) {
                    this.video = res.data.data;
                    var identity = getCookie("identity");
                    if (this.video.status != 1) {

                        if (identity != "manager") {
                            this.$notify.error({
                                title: '权限不足！',
                                message: '视频状态特殊，您的权限无法浏览！'
                            });
                            setTimeout(() => {
                                // 跳转去登录页面
                                // console.log('跳转去登录页面');
                                this.$router.push('/home');
                            }, '1000');
                        }
                    } else {
                        if (this.video.form == 'VIP可见') {
                            if (identity != 'vip' && identity != 'vvip') {
                                this.$notify.error({
                                    title: '权限不足！',
                                    message: '会员专属视频，您的权限无法浏览！'
                                });
                                setTimeout(() => {
                                    // 跳转去登录页面
                                    // console.log('跳转去登录页面');
                                    this.$router.push('/home');
                                }, '1000');
                            } else {
                                // this.videoTags= this.video.tagList;
                                // console.log('this.video.tags:' + this.video.tags);
                                this.videoTags = this.video.tags.split(',');
                                // console.log(this.videoTags);
                                this.options.video.url = this.video.url;
                                this.options.video.pic = this.video.cover;
                                // console.log(this.options);
                                this.setVideo();
                            }

                        } else {
                            // this.videoTags= this.video.tagList;
                            // console.log('this.video.tags:' + this.video.tags);
                            this.videoTags = this.video.tags.split(',');
                            // console.log(this.videoTags);
                            this.options.video.url = this.video.url;
                            this.options.video.pic = this.video.cover;
                            // console.log(this.options);
                            this.setVideo();
                        }

                    }



                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },
        setVideo() {
            this.$refs.player.dp.switchVideo(this.options.video);
            // this.$refs.player.dp.switchVideo(
            //     {
            //         url: this.video.url,
            //         pic: this.video.cover,
            //         // user: '闪闪',
            //     }
            // );


        },
        checkLogin() {
            if (this.username == null || this.username.length == 0) {
                this.$notify.error({
                    title: '请登录后再操作',
                    message: '3秒后跳转登录界面'
                });
                setTimeout(() => {
                    // 跳转去登录页面
                    // console.log('跳转去登录页面');
                    this.$router.push('/login');
                }, '3000');
                return false;
            } else {
                return true;
            }
        },
        likeVideo() {
            if (this.checkLogin()) {
                var token = getCookie("token");
                this.$axios.post(`/video/likeVideo/${this.vid}/${this.username}/${token}`,).then(res => {
                    // console.log(res);
                    if (res.data.state == 0) {
                        this.$notify({
                            type: 'success',
                            title: '成功获得服务器回应',
                            message: res.data.message
                        });
                        // 刷新点赞数，不知道会不会刷新界面
                        this.getVideoDetail();
                    } else {
                        this.$notify.info({
                            title: '服务器消息',
                            message: res.data.message
                        });
                    }
                })
            }

        },
        unlikeVideo() {
            if (this.checkLogin()) {
                this.$axios.post(`/video/unlikeVideo/${this.vid}/${this.username}`).then(res => {
                    // console.log(res);
                    if (res.data.state == 0) {
                        this.$notify({
                            type: 'success',
                            title: '成功获得服务器回应',
                            message: res.data.message
                        });
                        // 刷新点赞数，不知道会不会刷新界面
                        this.getVideoDetail();
                    } else {
                        this.$notify.info({
                            title: '服务器消息',
                            message: res.data.message
                        });
                    }
                })
            }
        },
        upComment() {
            if (this.checkLogin()) {
                this.$axios.post(`/video/comment`, this.commentForm).then(res => {
                    // console.log(res);
                    if (res.data.state == 0) {
                        this.$notify({
                            type: 'success',
                            title: '成功获得服务器回应',
                            message: res.data.message
                        });
                        this.commentForm.context = '';
                        this.$refs.childComments.getManuscriptsByTime();
                        this.$refs.childComments.getManuscriptsByViews();
                    } else {
                        this.$notify.info({
                            title: '服务器消息',
                            message: res.data.message
                        });
                    }
                })
            }
        },
    }
}
</script>
<style lang="less" scoped>
.main {
    width: 1000px;
    height: 900px;
    margin: 0 auto;
    text-align: center;
}

/deep/.dplayer-danmaku-item {
    span {
        border: none !important; //去掉弹幕边框
    }
}
</style>