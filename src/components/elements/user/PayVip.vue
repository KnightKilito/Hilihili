<template>
    <div :class="[
        `row justify-content-center`,
        { 'row--30': pricingStyle === 1 },
        { 'row--15': pricingStyle === 2 },
        { 'row--0': pricingStyle === 3 },
        { 'row--0': pricingStyle === 4 },
        { 'row--15': pricingStyle === 5 },
    ]">
        <div :class="[`col-md-6 col-12`, pricingStyle === 4 ? 'col-lg-3' : 'col-lg-4']"
            v-for="(pricing, index) in pricingData" :key="index" data-aos="fade-up" data-aos-delay="60">
            <div :class="[
                `rn-pricing`,
                { 'active': pricing.isActive },
                { 'style-2': pricingStyle === 2 || pricingStyle === 3 },
                { 'style-5': pricingStyle === 2 || pricingStyle === 5 }
            ]">
                <div class="pricing-table-inner">
                    <div class="pricing-header">
                        <h4 class="title">{{ pricing.title }}</h4>
                        <div class="pricing">
                            <div class="price-wrapper">
                                <span class="currency">{{ pricing.currency }}</span>
                                <span class="price">{{ pricing.price }}</span>
                            </div>
                            <span class="subtitle">{{ pricing.subtitle }}</span>
                        </div>
                    </div>
                    <div class="pricing-body">
                        <ul class="list-style--1">
                            <li v-for="feature in pricing.features">
                                <template v-if="feature">
                                    <Icon name="check" size="18" /> {{ feature.title }}
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div class="pricing-footer">
                        <!-- <a :class="[`btn-default`, {'btn-border': !pricing.isActive}]"
                           :href="pricing.btn.link ? pricing.btn.link : '#'">
                            {{ pricing.btn.text }}
                        </a> -->
                        <button :class="[`btn-default`, { 'btn-border': !pricing.isActive }]"
                            @click="goToPay(pricing.price, pricing.type)">
                            {{ pricing.btn.text }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="payform" v-html="paybox"></div>

        <el-dialog title="???????????????" :visible.sync="dialogVisible" width="30%"  :show-close="false" :append-to-body="true" :modal="true"
        :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="true">
            <span>???????????????</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="goToOrders">?????????</el-button>
                <el-button type="primary" @click="dialogVisible = false">?????????</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>

// document.forms[0].submit();

import SectionTitle from '../../elements/sectionTitle/SectionTitle'
import Icon from '../../icon/Icon'
import { getCookie } from '../../utils/cookieUtil'

export default {
    name: 'PayVip',
    components: { SectionTitle, Icon },
    props: {
        // pricingData: {},
        // pricingStyle: {
        //     type: Number,
        //     default: 1
        // }
    },
    data() {
        return {
            dialogVisible: false,
            pricingStyle: 3,
            pricingData: [
                {
                    title: '?????????',
                    currency: '???',
                    price: 29,
                    type: 'vip',
                    subtitle: 'RMB Per Month',
                    features: [
                        { title: '????????????????????????'},
                        { title: '?????????????????????' },
                        { title: '?????????????????????' },
                        { title: '??????????????????' },
                        { title: '???????????????Pro Plus Max???????????????????????????' },
                    ],
                    btn: {
                        text: '????????????',
                        link: '/'
                    }
                },
                {
                    title: '????????? Pro Plus Max',
                    currency: '???',
                    price: 50,
                    type: 'vvip',
                    subtitle: 'RMB Per Month',
                    features: [
                        { title: '????????????????????????'},
                        { title: '?????????????????????' },
                        { title: '?????????Pro Plus Max????????????' },
                        { title: '??????????????????' },
                        { title: '??????????????????' },
                        { title: '???????????????????????????????????????????????????' },
                    ],
                    btn: {
                        text: '????????????',
                        link: '/'
                    },
                    isActive: true
                }
            ],
            showGoToSpace: false,
            showGoBack: false,

            trade: {
                // tradeid: '',
                username: getCookie('username'),
                tmoney: 35,
                type: 'vip',

            },
            paybox: ``,
        }
    },
    mounted() {
        // this.load();
    },
    methods: {
        goToPay(price, type) {
            if (this.trade.username.length == 0) {
                this.$notify.info({
                    title: '???????????????',
                    message: '3????????????????????????'
                });
                setTimeout(() => {
                    // ???????????????????????????
                    this.$router.push('/login');
                }, '3000');
            } else {
                this.trade.tmoney = price;
                this.trade.type = type;
                this.trade.datetime = null;
                this.$axios.post(`/user/trade`, this.trade).then(res => {
                    // console.log(res);
                    if (res.data.state == 0) {
                        this.trade = res.data.data;
                        this.goToAliPay();
                    } else {
                        this.$notify.info({
                            title: '???????????????',
                            message: res.data.message
                        });
                    }
                })
            }

        },
        goToAliPay() {
            this.$axios.post(`/alipay/pay/${this.trade.tradeid}`).then(res => {
                // console.log(res);
                if (res.data.state == 0) {
                    document.write(res.data.data);

                    // const payform = document.getElementById('payform');
                    // payform.append(res.data.data);

                    // this.paybox = res.data.data;
                    // document.forms[0].submit();
                } else {
                    this.$notify.info({
                        title: '???????????????',
                        message: res.data.message
                    });
                }
            })
        },
        goToOrders(){
            this.$route.push("/orders");
        },
        checkOrder(){
            this.$axios.get(`/user/trade/tradeid/${this.trade.tradeid}`).then(res => {
                // console.log(res);
                if (res.data.state == 0) {
                    if(res.data.data.status == 1){
                        this.$route.push("/payinfo/success");
                    }else{
                        this.$route.push("/orders");
                    }
                    
                } else {
                    this.$notify.info({
                        title: '???????????????',
                        message: res.data.message
                    });
                }
            })
        },
    }
}
</script>