<template>
    <Layout>
        <div class="rn-blog-details-area">

            <div class="blog-details-content pt--60 rn-section-gapBottom">
                <div class="container">
                    <ManagerTag column="col-lg-4 col-md-6 col-12 mt--30" 
                        button-class="btn btn-default btn-large btn-icon round" />
                   
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '../components/common/Layout'
import Icon from '../components/icon/Icon'
import ManagerTag from '../components/elements/video/ManagerTag'

export default {
    name: 'ManagerTagsPage',
    components: { Icon, Layout, ManagerTag },
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