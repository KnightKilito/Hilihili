<template>
    <Layout>
        <!-- Start Video Area -->
        <div class="rwt-video-popup-area rn-section-gap">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <SectionTitle
                            text-align="center"
                            subtitle="Popup Video"
                            title="Video Popup Style"
                        />
                    </div>
                </div>
                <Video :video-data="videoData"/>
            </div>
        </div>
        <!-- End Video Area -->
    </Layout>
</template>

<script>
    import Layout from '../components/common/Layout'
    import Breadcrumb from '../components/elements/breadcrumb/Breadcrumb'
    import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
    import Video from '../components/elements/video/Video'

    export default {
        name: 'VideoPage',
        components: {Video, SectionTitle, Layout, Breadcrumb},
        data() {
            return {
                videoData: [
                    {
                        thumb: require(`@/assets/images/portfolio/portfolio-04.jpg`),
                        src: 'https://www.youtube.com/watch?v=d0tU18Ybcvk',
                    },
                    {
                        thumb: require(`@/assets/images/portfolio/portfolio-04.jpg`),
                        src: 'https://www.youtube.com/watch?v=d0tU18Ybcvk',
                    },
                    {
                        thumb: require(`@/assets/images/portfolio/portfolio-04.jpg`),
                        src: 'https://video.moechun.fun/bilibili/%E5%9B%9B%E6%9C%88%E6%98%AF%E4%BD%A0%E7%9A%84%E8%B0%8E%E8%A8%80%E7%9C%9F%E4%BA%BA%E7%89%88mad.mp4',
                    }
                ]
            }
        }
    }
</script>