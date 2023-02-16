<template>
    <div class="row row--15">
        <div class="row">
            <div class="col-lg-12">
                <SectionTitle text-align="center" subtitle="评论区" data-aos="fade-up" />
            </div>
        </div>


        <div class="col-lg-12">
            <ul class="nav nav-pills rwt-portfolio-filter filter-button-default liststyle mb--20" id="pills-tab"
                role="tablist" data-aos="fade-up">
                <li class="nav-item list-item" role="presentation" v-for="(filter, index) in filters"
                    :key="`tab-button-${filter.id}`">
                    <button class="nav-link" :class="{ 'active': index === 0 }" :id="`pills-${filter.text}-tab`"
                        data-bs-toggle="pill" :data-bs-target="`#pills-${filter.text}`" type="button" role="tab"
                        :aria-controls="`pills-${filter.text}`" :aria-selected="index === activeTab ? 'true' : 'false'"
                        @click="activeTab = index">
                        {{ filter.text }}
                    </button>
                </li>
            </ul>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade" :class="{ 'show active': index === 0 }" :id="`pills-${filter.text}`"
                role="tabpanel" :aria-labelledby="`pills-${filter.text}-tab`" v-for="(filter, index) in filters"
                :key="`tab-pane-${filter.id}`">
                <div class="row row--15">
                    <template v-if="filter.text === '最新评论'">

                        <div class="rwt-elements-area rn-section-gapBottom" v-for="(blog, index) in manuscripts"
                            :key="index">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12 mt--30">
                                        <div class="testimonial-style-two">
                                            <div class="row align-items-center row--20">
                                                <div class="order-2 order-md-1 col-lg-6 col-md-8 offset-lg-1">
                                                    <div class="content mt_sm--40">
                                                        <div class="client-info">
                                                            <h4 class="title"
                                                                v-if="blog.identity != 'vip' && blog.identity != 'vvip'">
                                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                                    {{ blog.nickname }}：
                                                                </router-link>
                                                            </h4>
                                                            <h4 class="title" style="color:chartreuse"
                                                                v-if="blog.identity == 'vvip'">
                                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                                    {{ blog.nickname }}：
                                                                </router-link>
                                                            </h4>
                                                            <h4 class="title" style="color:lightcoral"
                                                                v-if="blog.identity == 'vip'">
                                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                                    {{ blog.nickname }}：
                                                                </router-link>
                                                            </h4>
                                                            <h6 class="subtitle">{{ blog.identity }}</h6>
                                                        </div>

                                                        <span class="form"></span>

                                                        <p class="description">{{ blog.context }}</p>

                                                        <ul class="rn-meta-list">

                                                            <li>{{ blog.publishTimeStr }}</li>
                                                            <li class="separator">/</li>
                                                            <Icon name="thumbs-up" size="20" />
                                                            <li>
                                                                {{ blog.likeComment }}
                                                            </li>
                                                            <li class="separator">/</li>
                                                            <Icon name="thumbs-down" size="20" />
                                                            <li>
                                                                {{ blog.unlikeComment }}
                                                            </li>

                                                        </ul>
                                                        <div class="button-group"
                                                            style="margin-top: 10px; margin-bottom: -10px;">
                                                            <button class="btn-default"
                                                                @click="likeOrUnlikeComment('like', blog.cid)">
                                                                <Icon name="thumbs-up" size="25" />
                                                            </button>
                                                            <button class="btn-default btn-border"
                                                                @click="likeOrUnlikeComment('unlike', blog.cid)">
                                                                <Icon name="thumbs-down" size="25" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- <div class="col-lg-6 col-xl-3 col-md-6 col-12 mt--30"> -->

                                                <div class="order-1 order-md-2 col-lg-4 col-md-4">
                                                    <div class="thumbnail">
                                                        <router-link class="image" :to="`/space/${blog.username}`">
                                                            <!-- <el-avatar v-bind:src="blog.avatarUrl" style="margin-top: 18px;"></el-avatar> -->
                                                            <!-- <el-image style="width: 100px; height: 100px" :src="blog.avatarUrl"
                                                                :preview-src-list="srcList">
                                                            </el-image> -->

                                                            <img class="w-100" :src="blog.avatarUrl"
                                                                alt="Testimonial image" />
                                                        </router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- <div class="col-md-12 col-12" data-aos="slide-up" data-aos-duration="800"
                            :data-aos-delay="100 + index" v-for="(blog, index) in manuscripts" :key="index">
                            <div class="rn-card box-card-style-default"
                                :class="{ 'card-list-view': blogPostStyle === 'list' }">
                                <div class="inner">

                                    <div class="thumbnail">
                                        <router-link class="image" :to="`/space/${blog.username}`">
                                            <img class="w-100" :src="blog.avatarUrl" :alt="blog.avatarUrl">
                                        </router-link>
                                    </div>

                                    <div class="content">

                                        <h4 class="title" v-if="blog.identity != 'vip' && blog.identity != 'vvip'">
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.nickname }}：
                                            </router-link>
                                        </h4>
                                        <h4 class="title" style="color:chartreuse" v-if="blog.identity == 'vvip'">
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.nickname }}：
                                            </router-link>
                                        </h4>
                                        <h4 class="title" style="color:lightcoral" v-if="blog.identity == 'vip'">
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.nickname }}：
                                            </router-link>
                                        </h4>
                                        <h4 class="title">

                                            {{ blog.context }}

                                        </h4>
                                        <ul v-if="blogPostStyle === 'list'" class="rn-meta-list">

                                            <li>{{ blog.publishTimeStr }}</li>
                                            <li class="separator">/</li>
                                            <Icon name="thumbs-up" size="20" />
                                            <li>
                                                {{ blog.likeComment }}
                                            </li>
                                            <li class="separator">/</li>
                                            <Icon name="thumbs-down" size="20" />
                                            <li>
                                                {{ blog.unlikeComment }}
                                            </li>

                                        </ul>
                                        <div class="button-group" style="margin-top: 10px; margin-bottom: -10px;">
                                            <button class="btn-default" @click="likeOrUnlikeComment('like', blog.cid)">
                                                <Icon name="thumbs-up" size="25" />
                                            </button>
                                            <button class="btn-default btn-border"
                                                @click="likeOrUnlikeComment('unlike', blog.cid)">
                                                <Icon name="thumbs-down" size="25" />
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div> -->
                        <div class="row row--15">
                            <div class="col-lg-12 text-center">
                                <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                    <el-pagination small @size-change="handleSizeChangeManuscripts"
                                        @current-change="handleCurrentChangeManuscripts"
                                        :current-page="currentPageManuscripts"
                                        :page-sizes="[3, 6, 9, 12, 15, 18, 21, 24]" :page-size="pageSizeManuscripts"
                                        layout="total, sizes, prev, pager, next, jumper" :total="allManuscripts">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-if="filter.text === '最火评论'">

                        <div class="rwt-elements-area rn-section-gapBottom" v-for="(blog, index) in manuscriptsViews"
                            :key="index">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12 mt--30">
                                        <div class="testimonial-style-two">
                                            <div class="row align-items-center row--20">
                                                <div class="order-2 order-md-1 col-lg-6 col-md-8 offset-lg-1">
                                                    <div class="content mt_sm--40">
                                                        <div class="client-info">
                                                            <h4 class="title"
                                                                v-if="blog.identity != 'vip' && blog.identity != 'vvip'">
                                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                                    {{ blog.nickname }}：
                                                                </router-link>
                                                            </h4>
                                                            <h4 class="title" style="color:chartreuse"
                                                                v-if="blog.identity == 'vvip'">
                                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                                    {{ blog.nickname }}：
                                                                </router-link>
                                                            </h4>
                                                            <h4 class="title" style="color:lightcoral"
                                                                v-if="blog.identity == 'vip'">
                                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                                    {{ blog.nickname }}：
                                                                </router-link>
                                                            </h4>
                                                            <h6 class="subtitle">{{ blog.identity }}</h6>
                                                        </div>

                                                        <span class="form"></span>

                                                        <p class="description">{{ blog.context }}</p>

                                                        <ul class="rn-meta-list">

                                                            <li>{{ blog.publishTimeStr }}</li>
                                                            <li class="separator">/</li>
                                                            <Icon name="thumbs-up" size="20" />
                                                            <li>
                                                                {{ blog.likeComment }}
                                                            </li>
                                                            <li class="separator">/</li>
                                                            <Icon name="thumbs-down" size="20" />
                                                            <li>
                                                                {{ blog.unlikeComment }}
                                                            </li>

                                                        </ul>
                                                        <div class="button-group"
                                                            style="margin-top: 10px; margin-bottom: -10px;">
                                                            <button class="btn-default"
                                                                @click="likeOrUnlikeComment('like', blog.cid)">
                                                                <Icon name="thumbs-up" size="25" />
                                                            </button>
                                                            <button class="btn-default btn-border"
                                                                @click="likeOrUnlikeComment('unlike', blog.cid)">
                                                                <Icon name="thumbs-down" size="25" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="order-1 order-md-2 col-lg-4 col-md-4">
                                                    <div class="thumbnail">
                                                        <router-link class="image" :to="`/space/${blog.username}`">
                                                            <img class="w-100" :src="blog.avatarUrl"
                                                                alt="Testimonial image" /></router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- <div class="col-md-12 col-12" data-aos="slide-up" data-aos-duration="800"
                            :data-aos-delay="100 + index" v-for="(blog, index) in manuscriptsViews" :key="index">
                            <div class="rn-card box-card-style-default"
                                :class="{ 'card-list-view': blogPostStyle === 'list' }">
                                <div class="inner">
                                    <div class="thumbnail" style="width: 50px;">
                                        <router-link class="image" :to="`/space/${blog.username}`">
                                            <img class="w-100" style="width: 50px;" :src="blog.avatarUrl"
                                                :alt="blog.title">
                                        </router-link>
                                    </div>
                                    <div class="content">

                                        <h4 class="title" v-if="blog.identity != 'vip' && blog.identity != 'vvip'">
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.nickname }}：
                                            </router-link>
                                        </h4>
                                        <h4 class="title" style="color:chartreuse" v-if="blog.identity == 'vvip'">
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.nickname }}：
                                            </router-link>
                                        </h4>
                                        <h4 class="title" style="color:lightcoral" v-if="blog.identity == 'vip'">
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.nickname }}：
                                            </router-link>
                                        </h4>
                                        <h4 class="title">

                                            {{ blog.context }}

                                        </h4>
                                        <ul v-if="blogPostStyle === 'list'" class="rn-meta-list">

                                            <li>{{ blog.publishTimeStr }}</li>
                                            <li class="separator">/</li>
                                            <Icon name="thumbs-up" size="20" />
                                            <li>
                                                {{ blog.likeComment }}
                                            </li>
                                            <li class="separator">/</li>
                                            <Icon name="thumbs-down" size="20" />
                                            <li>
                                                {{ blog.unlikeComment }}
                                            </li>

                                        </ul>
                                        <div class="button-group" style="margin-top: 10px; margin-bottom: -10px;">
                                            <button class="btn-default" @click="likeOrUnlikeComment('like', blog.cid)">
                                                <Icon name="thumbs-up" size="25" />
                                            </button>
                                            <button class="btn-default btn-border"
                                                @click="likeOrUnlikeComment('unlike', blog.cid)">
                                                <Icon name="thumbs-down" size="25" />
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div> -->
                        <div class="row row--15">
                            <div class="col-lg-12 text-center">
                                <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                    <el-pagination small @size-change="handleSizeChangeManuscriptsViews"
                                        @current-change="handleCurrentChangeManuscriptsViews"
                                        :current-page="currentPageManuscriptsViews"
                                        :page-sizes="[3, 6, 9, 12, 15, 18, 21, 24]"
                                        :page-size="pageSizeManuscriptsViews"
                                        layout="total, sizes, prev, pager, next, jumper" :total="allManuscriptsViews">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>





    </div>
</template>

<script>
import SectionTitle from '../../elements/sectionTitle/SectionTitle'
import Icon from '../../icon/Icon'
import { getCookie } from '../../utils/cookieUtil';

export default {
    name: 'VideoComments',
    components: { SectionTitle, Icon },
    props: {
        // blog: {},
        blogPostStyle: {
            type: String,
            default: 'list'
        },
        buttonClass: {
            type: String,
            default: 'btn btn-default btn-large btn-icon'
        },
        column: {
            type: String,
            default: 'col-lg-6 col-md-6 col-sm-12 col-12 mt--30'
        },
    },
    data() {
        return {
            username: getCookie("username"),
            vid: this.$route.params.vid,
            manuscripts: [
                {
                    // vid: '',
                    // cover: '',
                    // uptime: '',
                    // title: '视频投稿',
                    // uploader: '',
                    // intro: '',
                    // videoStatus: '',
                }

            ],
            allManuscripts: 0,
            currentPageManuscripts: 1,
            pageSizeManuscripts: 9,
            manuscriptsViews: [
                {
                    // vid: '',
                    // cover: '',
                    // uptime: '',
                    // title: '视频投稿',
                    // uploader: '',
                    // intro: '',
                    // videoStatus: '',
                }

            ],
            allManuscriptsViews: 0,
            currentPageManuscriptsViews: 1,
            pageSizeManuscriptsViews: 9,

            filters: [
                {
                    id: 1,
                    text: '最新评论',
                },
                {
                    id: 2,
                    text: '最火评论',
                },

            ],
            activeFilter: '',
            activeTab: 0,
        }
    },
    mounted() {
        this.getManuscriptsByTime();
        this.getManuscriptsByViews();
    },
    methods: {
        likeOrUnlikeComment(condition, cid) {
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

            } else {
                this.$axios.post(`/video/comment/like/${condition}/${cid}`).then(res => {
                    // console.log(res);
                    if (res.data.state == 0) {
                        this.$notify({
                            type: 'success',
                            title: '成功获得服务器回应',
                            message: res.data.message
                        });
                        // this.manuscripts = res.data.datas;
                        // this.allManuscripts = res.data.count;
                        this.getManuscriptsByTime();
                        this.getManuscriptsByViews();
                    } else {
                        this.$notify.info({
                            title: '服务器消息',
                            message: res.data.message
                        });
                    }
                })
            }



        },
        getManuscriptsByTime() {

            this.$axios.get(`/video/comment/get/${this.vid}/publishTime/${this.currentPageManuscripts}/${this.pageSizeManuscripts}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.manuscripts = res.data.datas;
                    this.allManuscripts = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },

        // ==========分页用==========
        handleSizeChangeManuscripts(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeManuscripts = val;
            this.getManuscriptsByTime();
        },
        handleCurrentChangeManuscripts(val) {
            console.log(`当前页: ${val}`);
            this.currentPageManuscripts = val;
            this.getManuscriptsByTime();
        },
        getManuscriptsByViews() {

            this.$axios.get(`/video/comment/get/${this.vid}/likeComment/${this.currentPageManuscriptsViews}/${this.pageSizeManuscriptsViews}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.manuscriptsViews = res.data.datas;
                    this.allManuscriptsViews = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },

        // ==========分页用==========
        handleSizeChangeManuscriptsViews(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeManuscriptsViews = val;
            this.getManuscriptsByViews();
        },
        handleCurrentChangeManuscriptsViews(val) {
            console.log(`当前页: ${val}`);
            this.currentPageManuscriptsViews = val;
            this.getManuscriptsByViews();
        }
    }
}
</script>