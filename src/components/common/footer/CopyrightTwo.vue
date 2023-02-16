<template>
    <div class="copyright-area copyright-style-one variation-two">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 col-md-7 col-sm-12 col-12">
                    <div class="copyright-left">
                        <ul class="ft-menu link-hover">
                            <li>
                                <router-link to="https://space.bilibili.com/23042208">Watch Arts</router-link>
                            </li>
                            <li>
                                <router-link to="https://moechun.fun/">Tech Blog</router-link>
                            </li>
                            <li>
                                <router-link to="https://moechun.fun/about/">Contact Me</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-5 mt_sm--20">
                    <div class="copyright-center text-center">
                        <ul class="social-icon social-default color-lessdark justify-content-center">
                            <li><a href="https://github.com/KnightKilito" target="_blank"><Icon name="github"/></a></li>
                            <li><a href="https://space.bilibili.com/23042208" target="_blank"><Icon name="tv"/></a></li>
                            <li><a href="https://moechun.fun/" target="_blank"><Icon name="bold"/></a></li>
                            <li><a href="https://moechun.fun/img/vx-reward.png" target="_blank"><Icon name="coffee"/></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 col-12 mt_md--20 mt_sm--20">
                    <div class="copyright-right text-center text-lg-end">
                        <p class="copyright-text">
                            Copyright All rights reserved © {{ new Date().getFullYear() }} Hilihili
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from '../../icon/Icon'

    export default {
        name: 'CopyrightTwo',
        components: {Icon}
    }
</script>