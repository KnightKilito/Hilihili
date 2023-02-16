<template>
    <div class="about-style-5 rn-section-gapBottom">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 offset-lg-1">
                    <div class="row row--0 about-wrapper align-items-center theme-shape">
                        <div class="col-lg-6">
                            <div class="thumbnail">
                                <img :src="userForm.avatar" alt="About Images" />
                            </div>
                        </div>
                        <div class="col-lg-6 mt_md--30 mt_sm--30">
                            <div class="content">
                                <div class="inner">
                                    <h4 class="title" v-if="userForm.identity != 'vip' && userForm.identity != 'vvip'">
                                        {{userForm.nickname}}
                                    </h4>
                                    <h4 class="title" style="color:chartreuse" v-if="userForm.identity == 'vvip'">
                                        {{userForm.nickname}}
                                    </h4>
                                    <h4 class="title" style="color:lightcoral" v-if="userForm.identity == 'vip'">
                                        {{userForm.nickname}}
                                    </h4>
                                    <p>{{userForm.selfInfo}}</p>
                                    <ul class="contact-address">
                                        <li>
                                            <Icon name="award" />
                                            {{userForm.identity}}
                                        </li>
                                        <li v-if="(userForm.identity == 'vip' || userForm.identity == 'vvip') && routeUsername === loginUsername">
                                            <Icon name="clock" />
                                            {{userForm.viptimeStr}}
                                        </li>
                                        <li>
                                            <Icon name="user" />
                                            {{userForm.uid}}
                                        </li>
                                        <li>
                                            <Icon name="phone" />
                                            {{userForm.phone}}
                                        </li>
                                        <li>
                                            <Icon name="mail" />
                                            {{userForm.email}}
                                        </li>
                                    </ul>
                                    <div class="download-button mt--20" v-show="showModifyButton">
                                        <a class="btn-read-more" href="#" @click="showModifyDialog"><span>编辑个人资料</span></a>
                                        <ModifyUserInfo ref="modifyUserInfo"/>
                                        <!-- <a class="btn-read-more" href="/pay/vip" ><span>成为大会员</span></a> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../../icon/Icon'
import ModifyUserInfo from './ModifyUserInfo'
import { getCookie, setCookie } from '../../utils/cookieUtil'

export default {
    name: 'UserInfo',
    components: { Icon, ModifyUserInfo },
    data() {
        return {
            userForm:{},

            showModifyButton: false,

            routeUsername: this.$route.params.username,
            loginUsername: getCookie("username"),
        }
    },
    mounted: function () {
        this.getInfo();
    },
    methods: {
        openModifyButton() {
            this.showModifyButton = true;
        },
        getInfo() {
            var routeUsername = this.$route.params.username;
            var loginUsername = getCookie("username");
            if (routeUsername == loginUsername) {
                this.showFollow = false;
                this.openModifyButton();
                this.$axios.get("/user/username/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.userForm = res.data.data;
                    console.log(`setCookie:(identity,${this.userForm.identity})`);
                    setCookie("identity",this.userForm.identity);
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
            }else{
                this.$axios.get("/user/username/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.userForm = res.data.data;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
            }
            
        },
        showModifyDialog() {
            this.$refs.modifyUserInfo.open();
        }
    }
}
</script>