<template>
    <div class="row row--15">
        <div class="row">
            <div class="col-lg-12">
                <SectionTitle text-align="center" subtitle="Tag" :title="tagName" description="标签" data-aos="fade-up" />
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
                    <template v-if="filter.text === '最新'">

                        <div class="col-lg-4 col-md-6 col-sm-12 col-12 mt--30" data-aos="slide-up"
                            data-aos-duration="800" :data-aos-delay="100 + index" v-for="(blog, index) in manuscripts"
                            :key="index">
                            <div class="rn-card box-card-style-default"
                                :class="{ 'card-list-view': blogPostStyle === 'list' }">
                                <div class="inner">
                                    <div class="thumbnail">
                                        <router-link class="image" :to="`/video-detail/${blog.vid}`">
                                            <img class="w-100" :src="blog.cover" :alt="blog.title">
                                        </router-link>
                                    </div>
                                    <div class="content">
                                        <ul v-if="blogPostStyle === 'card'" class="rn-meta-list">
                                            <li>
                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                    {{ blog.uploader }}
                                                </router-link>
                                            </li>
                                            <li class="separator">/</li>
                                            <i class="el-icon-video-play"></i>
                                            <li>{{ blog.views }}</li>
                                            <li class="separator">/</li>
                                            <i class="el-icon-time"></i>
                                            <li>{{ blog.datetimeString }}</li>

                                        </ul>
                                        <h4 class="title">
                                            <router-link :to="`/video-detail/${blog.vid}`">
                                                {{ blog.title }}
                                            </router-link>
                                        </h4>
                                        <ul v-if="blogPostStyle === 'list'" class="rn-meta-list">
                                            <li>
                                                <router-link v-bind:to="`/space/${blog.username}`">
                                                    {{ blog.uploader }}
                                                </router-link>
                                            </li>
                                            <li class="separator">/</li>
                                            <li>{{ blog.uptime }}</li>
                                        </ul>


                                    </div>
                                </div>

                            </div>
                        </div>
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
                
                <template v-if="filter.text === '最火'">

                    <div class="col-lg-4 col-md-6 col-sm-12 col-12 mt--30" data-aos="slide-up" data-aos-duration="800"
                        :data-aos-delay="100 + index" v-for="(blog, index) in manuscriptsViews" :key="index">
                        <div class="rn-card box-card-style-default"
                            :class="{ 'card-list-view': blogPostStyle === 'list' }">
                            <div class="inner">
                                <div class="thumbnail">
                                    <router-link class="image" :to="`/video-detail/${blog.vid}`">
                                        <img class="w-100" :src="blog.cover" :alt="blog.title">
                                    </router-link>
                                </div>
                                <div class="content">
                                    <ul v-if="blogPostStyle === 'card'" class="rn-meta-list">
                                        <li>
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.uploader }}
                                            </router-link>
                                        </li>
                                        <li class="separator">/</li>
                                        <i class="el-icon-video-play"></i>
                                        <li>{{ blog.views }}</li>
                                        <li class="separator">/</li>
                                        <i class="el-icon-time"></i>
                                        <li>{{ blog.datetimeString }}</li>

                                    </ul>
                                    <h4 class="title">
                                        <router-link :to="`/video-detail/${blog.vid}`">
                                            {{ blog.title }}
                                        </router-link>
                                    </h4>
                                    <ul v-if="blogPostStyle === 'list'" class="rn-meta-list">
                                        <li>
                                            <router-link v-bind:to="`/space/${blog.username}`">
                                                {{ blog.uploader }}
                                            </router-link>
                                        </li>
                                        <li class="separator">/</li>
                                        <li>{{ blog.uptime }}</li>
                                    </ul>


                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row row--15">
                        <div class="col-lg-12 text-center">
                            <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                <el-pagination small @size-change="handleSizeChangeManuscriptsViews"
                                    @current-change="handleCurrentChangeManuscriptsViews"
                                    :current-page="currentPageManuscriptsViews" :page-sizes="[3, 6, 9, 12, 15, 18, 21, 24]"
                                    :page-size="pageSizeManuscriptsViews" layout="total, sizes, prev, pager, next, jumper"
                                    :total="allManuscriptsViews">
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

export default {
    name: 'TagVideo',
    components: { SectionTitle, Icon },
    props: {
        // blog: {},
        blogPostStyle: {
            type: String,
            default: 'card'
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
            tagName: this.$route.params.tagName,
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
                    text: '最新',
                },
                {
                    id: 2,
                    text: '最火',
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
        getManuscriptsByTime() {

            this.$axios.get(`/video/home/byTag/${this.tagName}/datetime/${this.currentPageManuscripts}/${this.pageSizeManuscripts}`).then(res => {
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

            this.$axios.get(`/video/home/byTag/${this.tagName}/views/${this.currentPageManuscriptsViews}/${this.pageSizeManuscriptsViews}`).then(res => {
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