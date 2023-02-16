<template>
    <Layout>
        <!-- Start Error-Area Area  -->
        <div class="error-area ptb--200 ptb_sm--60 ptb_md--80">
            <div class="container">
                <div class="row align-item-center">
                    <div class="col-lg-12">
                        <VerifyEmail/>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Error-Area Area  -->
    </Layout>
</template>

<script>
    import Layout from '../components/common/Layout'
    import Icon from '../components/icon/Icon'
    import VerifyEmail from '../components/elements/user/VerifyEmail.vue'

    export default {
        name: 'VerifyEmailPage',
        components: {Icon, Layout, VerifyEmail}
    }
</script>