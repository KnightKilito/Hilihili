<template>
    <Layout>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="content">

                    <!-- Start Contact Form Area  -->
                    <UploadVideoDetail />
                    <!-- End Contact Form Area  -->
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '../components/common/Layout'
import Icon from '../components/icon/Icon'
import UploadVideoDetail from '../components/elements/video/UploadVideoDetail'

export default {
    name: 'UploadDetailPage',
    components: { Icon, Layout, UploadVideoDetail},
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>