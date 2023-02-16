<template>
    <Layout>
        <!-- Start Contact Area  -->
        <div class="rwt-contact-area rn-section-gap">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 mb--40">
                        <SectionTitle
                            text-align="center"
                            subtitle="忘记密码"
                            title="密码重置"
                        />
                    </div>
                </div>
                
                <div class="row mt--40 row--15">
                    <div class="col-lg-5 mt_md--30 mt_sm--30">
                        <div class="thumbnail" data-aos="fade-up" data-aos-delay="250">
                            <img class="w-100" src="https://hilihili-resource.moechun.fun/default/LoginPageImg.jpg" alt="About Images">
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <ForgetPwd/>
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
    import ForgetPwd from "../components/elements/user/ForgetPwd";
    export default {
        name: 'ForgetPwdPage',
        components: { GoogleMap, Icon, SectionTitle, Breadcrumb, Layout, ForgetPwd}
    }
</script>