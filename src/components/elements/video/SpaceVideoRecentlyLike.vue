<template>
    <div class="row row--15">
        <div class="col-lg-4 col-md-6 col-sm-12 col-12 mt--30" data-aos="slide-up" data-aos-duration="800"
            :data-aos-delay="100 + index" v-for="(blog, index) in manuscripts" :key="index">
            <div class="rn-card box-card-style-default" :class="{ 'card-list-view': blogPostStyle === 'list' }">
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
                            <i class="el-icon-top"></i>
                            <li>{{ blog.likevideo }}</li>
                            <li class="separator">/</li>
                            <i class="el-icon-bottom"></i>
                            <li>{{ blog.unlike }}</li>

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
                            <li>{{ blog.datetimeString }}</li>
                        </ul>
                        <div>
                            <ul class="rn-meta-list">
                                <i class="el-icon-video-play"></i>
                                <li>{{ blog.views }}</li>
                                <li class="separator">/</li>
                                <i class="el-icon-top"></i>
                                <li>{{ blog.likevideo }}</li>
                                <li class="separator">/</li>
                                <i class="el-icon-bottom"></i>
                                <li>{{ blog.unlike }}</li>
                            </ul>
                        </div>


                    </div>
                </div>

            </div>
        </div>
        <div class="row row--15">
            <div class="col-lg-12 text-center">
                <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                    <el-pagination small @size-change="handleSizeChangeManuscripts"
                        @current-change="handleCurrentChangeManuscripts" :current-page="currentPageManuscripts"
                        :page-sizes="[3, 6, 9, 12]" :page-size="pageSizeManuscripts"
                        layout="total, sizes, prev, pager, next, jumper" :total="allManuscripts">
                    </el-pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'SpaceVideoRecentlyLike',
    props: {
        // blog: {},
        blogPostStyle: {
            type: String,
            default: 'list'
        }
    },
    data() {
        return {
            username: this.$route.params.username,
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
            pageSizeManuscripts: 3,

        }
    },
    mounted() {
        this.getManuscripts();
    },
    methods: {
        getManuscripts() {
            this.$axios.get(`/video/space/byUsername/recentlyLike/${this.username}/${this.currentPageManuscripts}/${this.pageSizeManuscripts}`).then(res => {
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
            this.getManuscripts();
        },
        handleCurrentChangeManuscripts(val) {
            console.log(`当前页: ${val}`);
            this.currentPageManuscripts = val;
            this.getManuscripts();
        }
    }
}
</script>