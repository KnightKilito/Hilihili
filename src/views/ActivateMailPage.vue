<template>
    <Layout>
        <!-- Start Error-Area Area  -->
        <div class="error-area ptb--200 ptb_sm--60 ptb_md--80">
            <div class="container">
                <div class="row align-item-center">
                    <div class="col-lg-12">
                        <ActivateMail/>
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
    import ActivateMail from '../components/elements/user/ActivateMail.vue'

    export default {
        name: 'ActivateMailPage',
        components: {Icon, Layout, ActivateMail}
    }
</script>