<template>
    <div class="row row--15">
        <div class="row">
            <div class="col-lg-12">
                <SectionTitle text-align="center" subtitle="支付结果" :title="result" :description="descriptions"
                    data-aos="fade-up" />
            </div>
        </div>
        <div class="col-lg-12" style="text-align: center;">
            <div class="blog-btn" v-show="showGoToSpace">
                <a class="btn-default" :href="`/space/${username}`">
                    <span>前往个人空间</span>
                    <Icon name="arrow-right" size="25" />
                </a>
            </div>
            <button class="btn-default" @click="goBack()" label="返回上一级" v-show="showGoBack">
                返回上一级
                <Icon name="arrow-left" size="20" />
            </button>
        </div>

    </div>
</template>

<script>
import SectionTitle from '../../elements/sectionTitle/SectionTitle'
import Icon from '../../icon/Icon'
import { getCookie } from '../../utils/cookieUtil'

export default {
    name: 'PayInfo',
    components: { SectionTitle, Icon },
    data() {
        return {
            result: this.$route.params.result,
            username: getCookie('username'),
            showGoToSpace: false,
            showGoBack: false,
            descriptions: ''
        }
    },
    mounted: function() {
        this.setButton();
    },
    methods: {
        setButton() {
            if (this.result == 'success') {
                this.showGoToSpace = true;
                this.showGoBack = false;
                this.descriptions = '支付成功，请重新登录刷新权限！'
            } else {
                this.showGoToSpace = false;
                this.showGoBack = true;
                this.descriptions = '出现异常了！请重新支付或联系管理员！'
            }
        },
        goToSpace() {
            this.$router.push(`/space/${this.username}`);
        },
        goBack() {
            this.$router.go(-1);
        },
    }
}
</script>