<template>
    <Layout>
        <!-- Start Contact Area  -->
        <div class="rwt-contact-area rn-section-gap">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 mb--40">
                        <SectionTitle
                            text-align="center"
                            subtitle="注册"
                            title="成为我们的一员 !"
                        />
                    </div>
                </div>
                <div class="row row--15">
                    <div class="col-lg-12">
                        <div class="rn-contact-address mt_dec--30">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-12">
                                    <div class="rn-address">
                                        <div class="icon">
                                            <Icon name="headphones" :size="40"/>
                                        </div>
                                        <div class="inner">
                                            <h4 class="title">联系电话</h4>
                                            <p><a href="tel:+86 0592 522 1234">+86 0592 522 1234</a></p>
                                            <p><a href="tel:+86 0592 520 1234">+86 0592 520 1234</a></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 col-12">
                                    <div class="rn-address">
                                        <div class="icon">
                                            <Icon name="mail" :size="40"/>
                                        </div>
                                        <div class="inner">
                                            <h4 class="title">联系邮箱</h4>
                                            <p><a href="mailto:KnightKilito@163.com">KnightKilito@163.com</a></p>
                                            <p><a href="mailto:hilihili@gmail.com">hilihili@gmail.com</a></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 col-12">
                                    <div class="rn-address">
                                        <div class="icon">
                                            <Icon name="map-pin" :size="40"/>
                                        </div>
                                        <div class="inner">
                                            <h4 class="title">我们的地址</h4>
                                            <p>厦门市 <br /> 福建省，中华人民共和国</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt--40 row--15">
                    <div class="col-lg-7">
                        <Register/>
                    </div>
                    <div class="col-lg-5 mt_md--30 mt_sm--30">
                        <!-- <GoogleMap/> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- End Contact Area  -->
    </Layout>
</template>

<script>
    import Layout from '../components/common/Layout'
    import Breadcrumb from '../components/elements/breadcrumb/Breadcrumb'
    import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
    import Icon from "../components/icon/Icon";
    import GoogleMap from "../components/elements/contact/GoogleMap";
    // import ContactForm from "../components/elements/contact/ContactForm";
    import Register from "../components/elements/user/Register";
    export default {
        name: 'RegisterPage',
        components: { GoogleMap, Icon, SectionTitle, Breadcrumb, Layout, Register}
    }
</script>