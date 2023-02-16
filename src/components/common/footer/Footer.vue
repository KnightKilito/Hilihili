<template>
    <div>
        <!-- Start Footer Area  -->
        <footer v-if="data.showFooter" class="rn-footer footer-style-default variation-two">
            <div v-if="data.showCta" class="rn-callto-action clltoaction-style-default style-7">
                <div class="container">
                    <div class="row row--0 align-items-center content-wrapper">
                        <div class="col-lg-8 col-md-8">
                            <div class="inner" data-aos="fade-up">
                                <div class="content text-left">
                                    <Logo />
                                    <p class="subtitle">
                                        你热爱的，就是你的生活。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <div class="call-to-btn text-start mt_sm--20 text-lg-end" data-aos="fade-up">
                                <div class="blog-btn">
                                    <a class="btn-default" href="https://www.bilibili.com/video/BV1xZ4y1o7iM">
                                        <span>给我三连</span>
                                        <Icon name="arrow-right" size="25"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-2 col-md-6 col-sm-6 col-12">
                            <div class="rn-footer-widget">
                                <h4 class="title">Services</h4>
                                <div class="inner">
                                    <ul class="footer-link link-hover">
                                        <li>
                                            <router-link to="/about">About</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/portfolio">Portfolio</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/contact">Contact</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/service">Service</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6 col-12">
                            <div class="rn-footer-widget">
                                <div class="widget-menu-top">
                                    <h4 class="title">Solutions</h4>
                                    <div class="inner">
                                        <ul class="footer-link link-hover">
                                            <li>
                                                <router-link to="/brand">Brand</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/call-to-action">call To Action</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/counter">Counter</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/service">Service</router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6 col-12">
                            <div class="rn-footer-widget">
                                <h4 class="title">Company</h4>
                                <div class="inner">
                                    <ul class="footer-link link-hover">
                                        <li>
                                            <router-link to="/pricing">Pricing</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/tab">Tab Styles</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/service">Service</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/social-share">Social</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6 col-12">
                            <div class="rn-footer-widget">
                                <h4 class="title">Resources</h4>
                                <div class="inner">
                                    <ul class="footer-link link-hover">
                                        <li>
                                            <router-link to="/team">Team</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/testimonial">Testimonial</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/service">Service</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/timeline">Timeline</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="rn-footer-widget">
                                <h4 class="title">在Hilihili尽情玩耍！</h4>
                                <div class="inner">
                                    <h6 class="subtitle">2000+ 用户在全球关注着我们！</h6>
                                    <ul class="social-icon social-default justify-content-start">
                                        <li><a href="https://github.com/KnightKilito" target="_blank">
                                                <Icon name="github" />
                                            </a></li>
                                        <li><a href="https://space.bilibili.com/23042208" target="_blank">
                                                <Icon name="tv" />
                                            </a></li>
                                        <li><a href="https://moechun.fun/" target="_blank">
                                                <Icon name="bold" />
                                            </a></li>
                                        <li><a href="https://moechun.fun/img/vx-reward.png" target="_blank">
                                                <Icon name="coffee" />
                                            </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter v-if="data.showNewsletter" />
        </footer>
        <!-- End Footer Area  -->

        <Copyright v-if="data.showCopyright" />

        <ScrollTop />
    </div>
</template>

<script>
import Copyright from './Copyright'
import Button from '../../elements/button/Button'
import Icon from '../../icon/Icon'
import ScrollTop from './ScrollTop'
import Logo from '../../elements/logo/Logo'
import Newsletter from './Newsletter'

export default {
    name: 'Footer',
    components: { Newsletter, Logo, ScrollTop, Icon, Button, Copyright },
    props: {
        data: {
            default: null
        }
    }
}
</script>