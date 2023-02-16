<template>
    <div>
        <div class="row row--15">
            <div class="col-lg-12">
                <ul class="nav nav-pills rwt-portfolio-filter filter-button-default liststyle mb--20" id="pills-tab"
                    role="tablist" data-aos="fade-up">
                    <li class="nav-item list-item" role="presentation" v-for="(filter, index) in filters"
                        :key="`tab-button-${filter.id}`">
                        <button class="nav-link" :class="{ 'active': index === 0 }" :id="`pills-${filter.text}-tab`"
                            data-bs-toggle="pill" :data-bs-target="`#pills-${filter.text}`" type="button" role="tab"
                            :aria-controls="`pills-${filter.text}`"
                            :aria-selected="index === activeTab ? 'true' : 'false'" @click="activeTab = index">
                            {{ filter.text }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade" :class="{ 'show active': index === 0 }" :id="`pills-${filter.text}`"
                role="tabpanel" :aria-labelledby="`pills-${filter.text}-tab`" v-for="(filter, index) in filters"
                :key="`tab-pane-${filter.id}`">
                <div class="row row--15">

                    <template v-if="filter.text === '最新发布'">
                        <div :class="`${column} portfolio`" data-aos="fade-up"
                            v-for="(portfolio, index) in LatestVideos" :key="index">
                            <div class="rwt-card">
                                <div class="inner">
                                    <div class="thumbnail">
                                        <figure class="card-image">
                                            <router-link :to="`/video-detail/${portfolio.vid}`">
                                                <img class="img-fluid" :src="portfolio.cover" alt="Portfolio-01" />
                                            </router-link>
                                        </figure>
                                        <router-link :to="`/video-detail/${portfolio.vid}`"
                                            class="rwt-overlay"></router-link>
                                    </div>
                                    <div class="content">
                                        <h5 class="title mb--10">
                                            <router-link :to="`/video-detail/${portfolio.vid}`">
                                                {{ portfolio.title }}
                                            </router-link>
                                        </h5>
                                        <span class="subtitle b2 text-capitalize">
                                            <i class="el-icon-video-play"></i>{{ portfolio.views }} /
                                            <i class="el-icon-arrow-up"></i>{{ portfolio.likevideo }} /
                                            <i class="el-icon-arrow-down"></i>{{ portfolio.unlike }} /
                                            <i class="el-icon-time"></i>{{ portfolio.datetimeString}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 text-center">
                            <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                <el-pagination small @size-change="handleSizeChangeLatestVideos"
                                    @current-change="handleCurrentChangeLatestVideos"
                                    :current-page="currentPageLatestVideos" :page-sizes="[3, 6, 9, 12]"
                                    :page-size="pageSizeLatestVideos" layout="total, sizes, prev, pager, next, jumper"
                                    :total="allLatestVideos">
                                </el-pagination>
                            </div>
                        </div>
                    </template>


                    <template v-if="filter.text === '最多播放'">
                        <div :class="`${column} portfolio`" v-for="(portfolio, index) in ViewsVideos" :key="index">
                            <div class="rwt-card">
                                <div class="inner">
                                    <div class="thumbnail">
                                        <figure class="card-image">
                                            <router-link :to="`/video-detail/${portfolio.vid}`">
                                                <img class="img-fluid" :src="portfolio.cover" alt="Portfolio-01" />
                                            </router-link>
                                        </figure>
                                        <router-link :to="`/video-detail/${portfolio.vid}`"
                                            class="rwt-overlay"></router-link>
                                    </div>
                                    <div class="content">
                                        <h5 class="title mb--10">
                                            <router-link :to="`/video-detail/${portfolio.vid}`">
                                                {{ portfolio.title }}
                                            </router-link>
                                        </h5>
                                        <span class="subtitle b2 text-capitalize">
                                            <i class="el-icon-video-play"></i>{{ portfolio.views }} /
                                            <i class="el-icon-arrow-up"></i>{{ portfolio.likevideo }} /
                                            <i class="el-icon-arrow-down"></i>{{ portfolio.unlike }} /
                                            <i class="el-icon-time"></i>{{ portfolio.datetimeString}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 text-center">
                            <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                <el-pagination small @size-change="handleSizeChangeViewsVideos"
                                    @current-change="handleCurrentChangeViewsVideos"
                                    :current-page="currentPageViewsVideos" :page-sizes="[3, 6, 9, 12]"
                                    :page-size="pageSizeViewsVideos" layout="total, sizes, prev, pager, next, jumper"
                                    :total="allViewsVideos">
                                </el-pagination>
                            </div>
                        </div>
                    </template>


                    <template v-if="filter.text === '最多点赞'">
                        <div :class="`${column} portfolio`" v-for="(portfolio, index) in LikesVideos" :key="index">
                            <div class="rwt-card">
                                <div class="inner">
                                    <div class="thumbnail">
                                        <figure class="card-image">
                                            <router-link :to="`/video-detail/${portfolio.vid}`">
                                                <img class="img-fluid" :src="portfolio.cover" alt="Portfolio-01" />
                                            </router-link>
                                        </figure>
                                        <router-link :to="`/video-detail/${portfolio.vid}`"
                                            class="rwt-overlay"></router-link>
                                    </div>
                                    <div class="content">
                                        <h5 class="title mb--10">
                                            <router-link :to="`/video-detail/${portfolio.vid}`">
                                                {{ portfolio.title }}
                                            </router-link>
                                        </h5>
                                        <span class="subtitle b2 text-capitalize">
                                            <i class="el-icon-video-play"></i>{{ portfolio.views }} /
                                            <i class="el-icon-arrow-up"></i>{{ portfolio.likevideo }} /
                                            <i class="el-icon-arrow-down"></i>{{ portfolio.unlike }} /
                                            <i class="el-icon-time"></i>{{ portfolio.datetimeString}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 text-center">
                            <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                <el-pagination small @size-change="handleSizeChangeLikesVideos"
                                    @current-change="handleCurrentChangeLikesVideos"
                                    :current-page="currentPageLikesVideos" :page-sizes="[3, 6, 9, 12]"
                                    :page-size="pageSizeLikesVideos" layout="total, sizes, prev, pager, next, jumper"
                                    :total="allLikesVideos">
                                </el-pagination>
                            </div>
                        </div>
                    </template>

                    <template v-if="filter.text === '最多收藏或投币'">
                        <div class="row row--15">
                            <div class="col-lg-12 text-center">
                                <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                    <a :class="buttonClass" href="#">
                                        待拓展
                                        <Icon name="loader" icon-class="icon" />
                                    </a>
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
import Icon from '../../icon/Icon'

export default {
    name: 'SpaceVideo',
    components: { Icon },
    props: {
        // portfolioData: {},
        buttonClass: {
            type: String,
            default: 'btn btn-default btn-large btn-icon'
        },
        column: {
            type: String,
            default: 'col-lg-6 col-md-6 col-sm-12 col-12 mt--30'
        }
    },
    data() {
        return {
            username: this.$route.params.username,
            filters: [
                {
                    id: 1,
                    text: '最新发布',
                },
                {
                    id: 2,
                    text: '最多播放',
                },
                {
                    id: 3,
                    text: '最多点赞',
                },
                {
                    id: 4,
                    text: '最多收藏或投币',
                }
            ],
            activeFilter: '',
            activeTab: 0,
            // 最新发布
            LatestVideos: [],
            allLatestVideos: 0,
            currentPageLatestVideos: 1,
            pageSizeLatestVideos: 6,
            // 最多播放
            ViewsVideos: [],
            allViewsVideos: 0,
            currentPageViewsVideos: 1,
            pageSizeViewsVideos: 6,
            // 最多点赞
            LikesVideos: [],
            allLikesVideos: 0,
            currentPageLikesVideos: 1,
            pageSizeLikesVideos: 6,
        }
    },
    mounted() {
        this.getLatestVideos();
        this.getViewsVideos();
        this.getLikesVideos();
    },
    methods: {
        // ==========最新发布==========
        getLatestVideos() {
            
            this.$axios.get(`/video/space/byUsername/datetime/${this.username}/${this.currentPageLatestVideos}/${this.pageSizeLatestVideos}`).then(res => {
                // console.log(res);
                if (res.data.state == 0) {
                    this.LatestVideos = res.data.datas;
                    this.allLatestVideos = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },
        // 分页用
        handleSizeChangeLatestVideos(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeLatestVideos = val;
            this.getLatestVideos();
        },
        handleCurrentChangeLatestVideos(val) {
            console.log(`当前页: ${val}`);
            this.currentPageLatestVideos = val;
            this.getLatestVideos();
        },
        // ==========最多播放==========
        getViewsVideos() {
            this.$axios.get(`/video/space/byUsername/views/${this.username}/${this.currentPageViewsVideos}/${this.pageSizeViewsVideos}`).then(res => {
                // console.log(res);
                if (res.data.state == 0) {
                    this.ViewsVideos = res.data.datas;
                    this.allViewsVideos = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },
        // 分页用
        handleSizeChangeViewsVideos(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeLatestVideos = val;
            this.getViewsVideos();
        },
        handleCurrentChangeViewsVideos(val) {
            console.log(`当前页: ${val}`);
            this.currentPageViewsVideos = val;
            this.getViewsVideos();
        },
        // ==========最多点赞==========
        getLikesVideos() {
            this.$axios.get(`/video/space/byUsername/likevideo/${this.username}/${this.currentPageLikesVideos}/${this.pageSizeLikesVideos}`).then(res => {
                // console.log(res);
                if (res.data.state == 0) {
                    this.LikesVideos = res.data.datas;
                    this.allLikesVideos = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },
        // 分页用
        handleSizeChangeLikesVideos(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeLikesVideos = val;
            this.getLikesVideos();
        },
        handleCurrentChangeLikesVideos(val) {
            console.log(`当前页: ${val}`);
            this.currentPageLikesVideos = val;
            this.getLikesVideos();
        },
    }
}
</script>