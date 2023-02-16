<template>
    <div>
        <div class="row row--15">
            <div class="col-lg-12">
                <ul class="nav nav-pills rwt-portfolio-filter filter-button-default liststyle mb--20"
                    id="pills-tab"
                    role="tablist"
                    data-aos="fade-up">
                    <li class="nav-item list-item"
                        role="presentation"
                        v-for="(filter, index) in filters"
                        :key="`tab-button-${filter.id}`">
                        <button class="nav-link"
                                :class="{'active': index === 0}"
                                :id="`pills-${filter.text}-tab`"
                                data-bs-toggle="pill"
                                :data-bs-target="`#pills-${filter.text}`"
                                type="button"
                                role="tab"
                                :aria-controls="`pills-${filter.text}`"
                                :aria-selected="index === activeTab ? 'true' : 'false'"
                                @click="activeTab = index">
                            {{ filter.text }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade"
                 :class="{'show active': index === 0}"
                 :id="`pills-${filter.text}`"
                 role="tabpanel"
                 :aria-labelledby="`pills-${filter.text}-tab`"
                 v-for="(filter, index) in filters"
                 :key="`tab-pane-${filter.id}`">
                <div class="row row--15">
                    <!-- <template v-if="filter.text === 'all'">
                        <div :class="`${column} portfolio`" data-aos="fade-up"
                            v-for="(portfolio, index) in CategoryVideos" :key="index">
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
                    </template> -->
                    
                    <template v-if=" filter.text === portfolio.region"
                              v-for="(portfolio, index) in CategoryVideos" >
                        <div :class="`${column} portfolio`">
                            <div class="rwt-card">
                                <div class="inner">
                                    <div class="thumbnail">
                                        <figure class="card-image">
                                            <router-link :to="`/video-detail/${portfolio.vid}`">
                                                <img class="img-fluid" :src="portfolio.cover" alt="Portfolio-01"/>
                                            </router-link>
                                        </figure>
                                        <router-link :to="`/video-detail/${portfolio.vid}`" class="rwt-overlay"></router-link>
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
                    </template>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import Icon from '../../icon/Icon'

    export default {
        name: 'SpaceVideoCategory',
        components: {Icon},
        props: {
            portfolioData: {},
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
                    // {
                    //     id: 1,
                    //     text: 'all',
                    // },
                    {
                        id: 1,
                        text: 'animation',
                    },
                    {
                        id: 2,
                        text: 'dance',
                    },
                    {
                        id: 3,
                        text: 'tec',
                    },
                    {
                        id: 4,
                        text: 'movie',
                    }
                ],
                activeFilter: '',
                activeTab: 0,
                CategoryVideos: [],
            }
        },
        mounted() {
        this.getCategoryVideos();
    },
    methods: {
        // ==========最新发布==========
        getCategoryVideos() {
            this.$axios.get(`/video/space/byUsername/datetime/${this.username}`).then(res => {
                // console.log(res);
                if (res.data.state == 0) {
                    this.CategoryVideos = res.data.datas;
                    // this.allLatestVideos = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        }
    
    }
    }
</script>