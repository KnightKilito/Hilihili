<template>
    <Layout>

        <!-- Start Elements Area -->
        <div class="rwt-pricing-area rn-section-gap">
            <div class="container">
                <div class="row mb--40 mb_sm--0">
                    <div class="col-lg-12">
                        <SectionTitle
                            text-align="center"
                            :subtitle="subtitle"
                            :title="title"
                            :description="description"
                            data-aos="fade-up"
                            data-aos-delay="60"
                        />
                    </div>
                </div>
                <PayVip  :pricing-style="3" v-if="showVip"/>
            </div>
        </div>
        <!-- End Elements Area -->

        <!-- <div class="rn-blog-details-area">

            <div class="blog-details-content pt--60 rn-section-gapBottom">
                <div class="container">
                    <PayVip column="col-lg-4 col-md-6 col-12 mt--30" v-if="showVip"
                        button-class="btn btn-default btn-large btn-icon round" />
                   
                </div>
            </div>
        </div> -->
    </Layout>
</template>

<script>
import Layout from '../components/common/Layout'
import Icon from '../components/icon/Icon'
import PayVip from '../components/elements/user/PayVip'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'


export default {
    name: 'PayPage',
    components: { Icon, Layout, PayVip ,SectionTitle},
    data() {
        return {
            payType: this.$route.params.payType,
            showVip: false,
            subtitle: 'VIP服务',
            title: 'Hilihili 会员服务购买',
            description: '你热爱的，就是你的生活。',
        }
    },
    methods: {
        showInfo(){
            if(this.payType == 'vip'){
                this.showVip = true;
            }
        },
    },
    mounted() {
        this.showInfo();
    }
}
</script>