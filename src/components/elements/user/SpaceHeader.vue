<template>
    <div class="slider-perosonal-portfolio height-750 bg_image" data-black-overlay="1"
        :style="{ 'background-image': `url(${userBg})` }">
        <div class="container">
            <div class="row row--30 align-items-center">
                <div class="col-12">
                    <div class="inner text-center">
                        <h1 class="title" data-aos="fade-up" data-aos-delay="100">
                            你好！我是<br /> <span class="theme-gradient">{{ username }}</span>
                        </h1>
                        <div class="button-group mt--30">
                            <el-button class="btn-default round btn-large" :plain="true" v-show="showFollow"
                                @click="followUser">关注我</el-button>
                            <el-button class="btn-default btn-large btn-border round" :plain="true"
                                v-show="showUnfollow" @click="unfollowUser">取消关注</el-button>
                        </div>
                        <div class="download-button mt--20">
                            <a class="btn-read-more" href="#" @click="showFollowingListMethod"><span>关注者：{{
                                following
                            }}</span></a>

                            <el-dialog title="关注者" :visible.sync="showFollowingList" :append-to-body="true"
                                :modal="true" style="text-align: center;">
                                <el-table :data="followingList" :cell-style="{ textAlign: 'center' }"
                                    :header-cell-style="{ backgroundColor: '#eef5ff', textAlign: 'center', }"
                                     style="width: 100%" >
                                    <el-table-column property="avatar" label="头像" >
                                        <template v-slot:default="scope">
                                            <el-avatar shape="square" :size="50" :src="scope.row.avatar"></el-avatar>
                                        </template>
                                    </el-table-column>
                                    <el-table-column property="nickname" label="昵称" ></el-table-column>
                                    <el-table-column property="spaceUrl" label="地址" >
                                        <template v-slot:default="scope">
                                            <el-link :underline="false" :href="'/space/' + scope.row.followingusername"
                                                type="primary">点击前往ta的空间</el-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作"  v-if="showBlock">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="danger"
                                                @click="blockUser('following', scope.row.username)">拉黑</el-button>
                                            <el-button size="mini"
                                                @click="unblockUser('following', scope.row.username)">解除拉黑</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination small @size-change="handleSizeChangeFollowing"
                                    @current-change="handleCurrentChangeFollowing" :current-page="currentPageFollowing"
                                    :page-sizes="[10, 50, 100, 200]" :page-size="pageSizeFollowing"
                                    layout="total, sizes, prev, pager, next, jumper" :total="following">
                                </el-pagination>
                            </el-dialog>

                            <span style="margin:80px;"></span>
                            <a class="btn-read-more" href="#" @click="showFollowersListMethod"><span>粉丝数：{{
                                followers
                            }}</span></a>
                            <el-dialog title="粉丝" :visible.sync="showFollowersList" :append-to-body="true"
                                style="text-align: center;" :modal="true">
                                <el-table :data="followersList" :cell-style="{ textAlign: 'center' }"
                                    :header-cell-style="{ backgroundColor: '#eef5ff', textAlign: 'center', }"
                                     style="width: 100%" >
                                    <el-table-column property="avatar" label="头像" >
                                        <template v-slot:default="scope">
                                            <el-avatar shape="square" :size="50" :src="scope.row.avatar"></el-avatar>
                                        </template>
                                    </el-table-column>
                                    <el-table-column property="nickname" label="昵称" ></el-table-column>
                                    <el-table-column property="spaceUrl" label="地址" >
                                        <template v-slot:default="scope">
                                            <el-link :underline="false" :href="'/space/' + scope.row.username"
                                                type="primary">点击前往ta的空间</el-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" v-if="showBlock">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="danger"
                                                @click="blockUser('follower', scope.row.username)">拉黑</el-button>
                                            <el-button size="mini"
                                                @click="unblockUser('follower', scope.row.username)">解除拉黑</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination small @size-change="handleSizeChangeFollowers"
                                    @current-change="handleCurrentChangeFollowers" :current-page="currentPageFollowers"
                                    :page-sizes="[10, 50, 100, 200]" :page-size="pageSizeFollowers"
                                    layout="total, sizes, prev, pager, next, jumper" :total="followers">
                                </el-pagination>
                            </el-dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../../icon/Icon'
import { getCookie } from '../../utils/cookieUtil'

export default {
    name: 'SpaceHeader',
    components: { Icon },
    data() {
        return {
            routeUsername: this.$route.params.username,
            loginUsername: getCookie("username"),
            showFollow: true,
            showUnfollow: false,
            showBlock: false,
            showUnblock: false,
            username: '',
            email: '',
            phone: '',
            nickname: '',
            selfInfo: '',
            avatar: '',
            userBg: 'https://hilihili-resource.moechun.fun/default/defUserBg.jpeg',
            following: 0,
            followers: 0,
            showFollowingList: false,
            showFollowersList: false,
            followingList: [
                {
                    avatar: 'https://hilihili-resource.moechun.fun/default/%E7%8C%AB%E5%92%AA.png',
                    nickname: '张三',
                    username: 'aaa1234',
                    spaceUrl: 'http://localhost:8081/space/aaa1234'
                }
            ],
            followersList: [
                {
                    avatar: 'https://hilihili-resource.moechun.fun/default/%E7%8C%AB%E5%92%AA.png',
                    nickname: '张三',
                    username: 'aaa1234',
                    spaceUrl: 'http://localhost:8081/space/aaa1234'
                }
            ],
            currentPageFollowing: 1,
            pageSizeFollowing: 10,
            currentPageFollowers: 1,
            pageSizeFollowers: 10,
        }
    },
    mounted: function () {
        this.getInfo();
        this.checkBlock();
    },
    methods: {
        checkBlock() {
            if (this.loginUsername.length != 0) {
                this.$axios.get(`/user/blockUser/${this.loginUsername}/${this.routeUsername}`).then(res => {
                    // console.log(res);
                    if (res.data.state == 126) {
                        this.$notify.info({
                            title: '服务器消息:' + res.data.state,
                            message: res.data.message
                        });
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, '3000');

                    } else {
                        this.$notify.info({
                            title: '服务器消息:' + res.data.state,
                            message: res.data.message
                        });
                    }
                })
            }
        },
        getInfo() {
            var routeUsername = this.$route.params.username;
            var loginUsername = getCookie("username");
            if (routeUsername == loginUsername) {
                this.showFollow = false;
                this.showBlock = true;
                this.showUnblock = true;
            } else {
                if (loginUsername != null && loginUsername != "") {
                    // 看看当前登录用户有没有关注该用户
                    this.$axios.get("/user/follow/" + loginUsername + "/" + routeUsername).then(res => {
                        console.log(res);
                        if (res.data.state == 0) {
                            this.showFollow = false;
                            this.showUnfollow = true;
                        } else {
                            this.showFollow = true;
                            this.showUnfollow = false;
                        }
                    })
                }
            }
            this.username = routeUsername;
            this.$axios.get("/user/username/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.email = res.data.data.email;
                    this.phone = res.data.data.phone;
                    this.nickname = res.data.data.nickname;
                    this.selfInfo = res.data.data.selfInfo;
                    this.avatar = res.data.data.avatar;
                    this.userBg = res.data.data.userBg;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
            // 查关注者
            this.searchFollowing();
            // 查粉丝
            this.searchFollowers();
        },
        searchFollowing() {
            var routeUsername = this.$route.params.username;
            this.$axios.get("/user/following/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.following = res.data.data;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
        searchFollowers() {
            var routeUsername = this.$route.params.username;
            this.$axios.get("/user/followers/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.followers = res.data.data;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
        followUser() {
            var routeUsername = this.$route.params.username;
            var loginUsername = getCookie("username");
            this.$axios.post("/user/follow/" + loginUsername + "/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.$notify({
                        type: 'success',
                        title: '成功获得服务器回应',
                        message: res.data.message
                    });
                    this.showFollow = false;
                    this.showUnfollow = true;
                    this.getInfo();
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            })
        },
        unfollowUser() {
            var routeUsername = this.$route.params.username;
            var loginUsername = getCookie("username");
            this.$axios.delete("/user/follow/" + loginUsername + "/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.$notify({
                        type: 'success',
                        title: '成功获得服务器回应',
                        message: res.data.message
                    });
                    this.showFollow = true;
                    this.showUnfollow = false;
                    this.getInfo();
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            })
        },
        showFollowingListMethod() {
            this.showFollowingList = true;
            this.getFollowingList();
        },
        getFollowingList() {
            var routeUsername = this.$route.params.username;
            this.$axios.get(`/user/following/${routeUsername}/${this.currentPageFollowing}/${this.pageSizeFollowing}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.followingList = res.data.datas;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
        showFollowersListMethod() {
            this.showFollowersList = true;
            this.getFollowersList();
        },
        getFollowersList() {
            var routeUsername = this.$route.params.username;
            this.$axios.get(`/user/followers/${routeUsername}/${this.currentPageFollowers}/${this.pageSizeFollowers}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.followersList = res.data.datas;
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
        handleSizeChangeFollowing(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeFollowing = val;
            this.getFollowingList();
        },
        handleCurrentChangeFollowing(val) {
            console.log(`当前页: ${val}`);
            this.currentPageFollowing = val;
            this.getFollowingList();
        },
        handleSizeChangeFollowers(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeFollowers = val;
            this.getFollowersList();
        },
        handleCurrentChangeFollowers(val) {
            console.log(`当前页: ${val}`);
            this.currentPageFollowing = val;
            this.getFollowersList();
        },
        blockUser(followWay, blockedUser) {
            this.$axios.post(`/user/blockUser/${followWay}/${this.loginUsername}/${blockedUser}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.$notify({
                        type: 'success',
                        title: '成功获得服务器回应',
                        message: res.data.message
                    });
                    this.getInfo();
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
        unblockUser(followWay, blockedUser) {
            this.$axios.delete(`/user/unblockUser/${followWay}/${this.loginUsername}/${blockedUser}`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.$notify({
                        type: 'success',
                        title: '成功获得服务器回应',
                        message: res.data.message
                    });
                    this.getInfo();
                } else {
                    this.$notify.info({
                        title: '服务器消息:' + res.data.state,
                        message: res.data.message
                    });
                }
            });
        },
    }
}
</script>