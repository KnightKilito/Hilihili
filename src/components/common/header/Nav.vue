<template>
    <ul class="mainmenu">
        <li class="has-droupdown has-menu-child-item">
            <a href="/home">
                首页
                <!-- <Icon name="plus" class="collapse-icon plus" />
                <Icon name="minus" class="collapse-icon minus" /> -->
            </a>
            <!-- <ul class="submenu">
                <li><router-link to="/business-consulting">Business Consulting</router-link></li>
                <li><router-link to="/business-consulting-2">Business Consulting 02</router-link></li>
                <li><router-link to="/corporate">Corporate</router-link></li>
                <li><router-link to="/business">Business</router-link></li>
                <li><router-link to="/digital-agency">Digital Agency</router-link></li>
                <li><router-link to="/finance">Finance</router-link></li>
                <li><router-link to="/company">Company</router-link></li>
                <li><router-link to="/marketing-agency">Marketing Agency</router-link></li>
                <li><router-link to="/travel-agency">Travel Agency</router-link></li>
                <li><router-link to="/consulting">Consulting</router-link></li>
                <li><router-link to="/seo-agency">SEO Agency</router-link></li>
                <li><router-link to="/personal-portfolio">Personal Portfolio</router-link></li>
                <li><router-link to="/event-conference">Event Conference</router-link></li>
                <li><router-link to="/creative-portfolio">Creative Portfolio</router-link></li>
                <li><router-link to="/freelancer">Freelancer</router-link></li>
                <li><router-link to="/international-consulting">International Consulting</router-link></li>
                <li><router-link to="/startup">Startup</router-link></li>
                <li><router-link to="/web-agency">Web Agency</router-link></li>
            </ul> -->
        </li>
        <!-- <li><router-link to="/about">About</router-link></li>
        <li class="with-megamenu has-menu-child-item">
            <a href="#">
                Elements
                <Icon name="plus" class="collapse-icon plus" />
                <Icon name="minus" class="collapse-icon minus" />
            </a>
            <div class="rn-megamenu">
                <div class="wrapper">
                    <div class="row row--0">
                        <div class="col-lg-3 single-mega-item">
                            <ul class="mega-menu-item">
                                <li><router-link to="/button">Button</router-link></li>
                                <li><router-link to="/service">Service</router-link></li>
                                <li><router-link to="/counter">Counter</router-link></li>
                                <li><router-link to="/progressbar">Progressbar</router-link></li>
                                <li><router-link to="/accordion">Accordion</router-link></li>
                                <li><router-link to="/social-share">Social Share</router-link></li>
                                <li><router-link to="/blog-grid">Blog Grid</router-link></li>
                            </ul>
                        </div>
                        <div class="col-lg-3 single-mega-item">
                            <ul class="mega-menu-item">
                                <li><router-link to="/team">Team</router-link></li>
                                <li><router-link to="/portfolio">Portfolio</router-link></li>
                                <li><router-link to="/testimonial">Testimonial</router-link></li>
                                <li><router-link to="/timeline">Timeline</router-link></li>
                                <li><router-link to="/tab">Tab</router-link></li>
                                <li><router-link to="/pricing">Pricing</router-link></li>
                                <li><router-link to="/spit-section">Split Section</router-link></li>
                            </ul>
                        </div>
                        <div class="col-lg-3 single-mega-item">
                            <ul class="mega-menu-item">
                                <li><router-link to="/call-to-action">Call To Action</router-link></li>
                                <li><router-link to="/video">Video</router-link></li>
                                <li><router-link to="/gallery">Gallery</router-link></li>
                                <li><router-link to="/contact">Contact</router-link></li>
                                <li><router-link to="/brand">Brand</router-link></li>
                                <li><router-link to="/portfolio">Portfolio</router-link></li>
                                <li><router-link to="/error">404</router-link></li>
                            </ul>
                        </div>
                        <div class="col-lg-3 single-mega-item">
                            <ul class="mega-menu-item">
                                <li>
                                    <router-link to="/advance-tab">
                                        Advance Tab <span class="rn-badge-card">Hot</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="#">
                                        Brand Carousel <span class="rn-badge-card">Comming</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/advance-pricing">
                                        Advance Pricing <span class="rn-badge-card">Hot</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/portfolio-details/1">
                                        Portfolio Details
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/blog-details/1">
                                        Blog Details
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li class="has-droupdown has-menu-child-item">
            <a href="#">
                Blog
                <Icon name="plus" class="collapse-icon plus" />
                <Icon name="minus" class="collapse-icon minus" />
            </a>
            <ul class="submenu">
                <li><router-link to="/blog-grid">Blog Grid</router-link></li>
                <li><router-link to="/blog-grid-sidebar">Blog Grid Sidebar</router-link></li>
                <li><router-link to="/blog-list">Blog List View</router-link></li>
                <li><router-link to="/blog-list-sidebar">Blog List View Sidebar</router-link></li>
            </ul>
        </li>
        <li class="has-droupdown has-menu-child-item">
            <a href="#">
                Portfolio
                <Icon name="plus" class="collapse-icon plus" />
                <Icon name="minus" class="collapse-icon minus" />
            </a>
            <ul class="submenu">
                <li><router-link to="/portfolio">Portfolio Default</router-link></li>
                <li><router-link to="/portfolio-three-column">Portfolio Three Column</router-link></li>
                <li><router-link to="/portfolio-full-width">Portfolio Full Width</router-link></li>
                <li><router-link to="/portfolio-grid-layout">Portfolio Grid Layout</router-link></li>
                <li><router-link to="/portfolio-box-layout">Portfolio Box Layout</router-link></li>
            </ul>
        </li> -->

        <li style="margin-top: 8px;">
            <div class="blog-search">
                <input type="text" placeholder="搜索的内容..." v-model="searchString">
                <button class="search-button" @click="searchInfo()">
                    <Icon name="search" size="20" />
                </button>
            </div>
        </li>

        <li class="has-droupdown has-menu-child-item" v-show="showLoginButton">
            <a href="#" @click="showChildLogin">登录</a>
            <Login ref="childLogin" />
        </li>
        <li v-show="showRegisterButton">
            <router-link to="/register">注册</router-link>
        </li>

        <li class="has-droupdown has-menu-child-item" v-show="showAvatarButton" >

            <a href="#" >
                <el-avatar v-bind:src="avatarUrl" style="margin-top: 18px;"></el-avatar>
            </a>
            <ul class="submenu">
                <li><router-link :to="'/space/' + username">个人中心</router-link></li>
                <li v-show="!showManager"><router-link :to="'/pay/vip'">大会员</router-link></li>
                <li v-show="!showManager"><router-link :to="'/orders'">订单管理</router-link></li>
                <li v-show="showManager"><router-link :to="'/manager/manuscripts'">稿件审核</router-link></li>
                <li v-show="showManager"><router-link :to="'/manager/users'">用户管理</router-link></li>
                <li v-show="showManager"><router-link :to="'/manager/tags'">标签管理</router-link></li>
                <li>
                    <router-link to="">
                        <el-popconfirm title="确定退出登录吗？" @confirm="logout">
                            <el-button type="text" slot="reference">退出登录</el-button>
                        </el-popconfirm>
                    </router-link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import Icon from "../../icon/Icon";
import Login from "../../elements/user/Login"
import { getCookie, delCookie } from '../../utils/cookieUtil'
export default {
    name: 'Nav',
    components: { Icon, Login },
    data() {
        return {
            showManager: false,
            searchString: '',
            username: '',
            showLoginButton: true,
            showRegisterButton: true,
            showAvatarButton: false,
            avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }
    },
    mounted: function () {
        this.getInfo();
    },
    methods: {
        getInfo() {
            var username = getCookie("username");
            this.username = username;
            var avatar = getCookie("avatar");
            if (username.length != 0) {
                this.showAvatar();
                this.avatarUrl = avatar;
            } else {
                console.log('no username');
                this.hideAvatar();
            }
            if(getCookie("identity") == "manager"){
                // console.log("showManager");
                this.showManager = true;
            }

        },
        searchInfo(){
            this.$router.push(`/search/${this.searchString}`);
            this.$router.go(0);
        },
        showChildLogin() {
            this.$refs.childLogin.showLogin();
        },
        hideChildLogin() {
            this.$refs.childLogin.hideLogin();
        },
        showAvatar() {
            this.showLoginButton = false;
            this.showRegisterButton = false;
            this.showAvatarButton = true;
        },
        hideAvatar() {
            this.showLoginButton = true;
            this.showRegisterButton = true;
            this.showAvatarButton = false;
        },
        logout() {
            delCookie("token");
            delCookie("username");
            this.hideAvatar();
            this.$notify({
                type: 'success',
                title: '账号成功退出',
                message: '请重新登录'
            });
            this.$router.go(0);
        }
    }
}
</script>