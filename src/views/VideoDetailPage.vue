<template>
    <Layout>
        <VideoDetail/>
    </Layout>
</template>

<script>
import Layout from '../components/common/Layout'
import Icon from '../components/icon/Icon'
import BlogPostMixin from '../mixins/BlogPostMixin'

import VideoDetail from '../components/elements/video/VideoDetail'

export default {
    name: 'VideoDetailPage',
    components: { Icon, VideoDetail, Layout },
    mixins: [BlogPostMixin],
    data() {
        return {
        }
    },
    
}
</script>