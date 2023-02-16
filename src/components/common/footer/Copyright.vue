<template>
    <!-- Start Copy Right Area  -->
    <div class="copyright-area copyright-style-one">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-8 col-sm-12 col-12">
                    <div class="copyright-left">
                        <ul class="ft-menu link-hover">
                            <li>
                                <router-link to="https://space.bilibili.com/23042208">欣赏艺术</router-link>
                            </li>
                            <li>
                                <router-link to="https://moechun.fun/">技术博客</router-link>
                            </li>
                            <li>
                                <router-link to="https://moechun.fun/about/">联系我们</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-6 col-md-4 col-sm-12 col-12">
                    <div class="copyright-right text-center text-lg-end">
                        <p class="copyright-text">© Hilihili {{ new Date().getFullYear() }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Copy Right Area  -->
</template>

<script>
    export default {
        name: 'Copyright'
    }
</script>