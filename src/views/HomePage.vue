<template>
    <Layout header-class="header-left-align header-transparent" nav-alignment="left"
        buy-button-class="btn-default btn-small">
        <!-- Start Slider Area -->
        <!-- <div class="slider-area slider-style-4 slider-dot rn-slick-dot rn-slick-arrow"> -->
        <!-- <VueSlickCarousel v-bind="sliderSetting"> -->

        <!-- <SliderVideoForHome /> -->
        <!-- </VueSlickCarousel> -->
        <!-- </div> -->
        <!-- End Slider Area -->


        <!-- Start Slider Area -->
        <!-- <div class="slider-area slider-style-4 slider-dot rn-slick-dot rn-slick-arrow"> -->
        <!-- <VueSlickCarousel v-bind="sliderSetting"> -->

        <!-- 唯一一个用组件会异常的地方，找个机会解决掉？或者就这样吧，唯一一处不是mvc的地方 -->

        <div class="slider-area slider-style-4 slider-dot rn-slick-dot rn-slick-arrow">
            <VueSlickCarousel v-bind="sliderSetting">
                <div v-for="(slider, index) in sliderData" :key="index" class="single-slide">
                    <div class="height-950 bg-overlay bg_image" :style="{ 'background-image': `url(${slider.cover})` }">
                        <div class="container">
                            <div class="row row--30 align-items-center">
                                <div class="col-12">
                                    <div class="inner text-center">
                                        <h1 class="title" v-html="slider.title" />
                                        <h3 class="description">
                                            <i class="el-icon-video-play"></i>
                                            {{ slider.views }}
                                            <i class="el-icon-arrow-up"></i>
                                            {{ slider.likevideo }}
                                        </h3>
                                        <p class="description" v-html="slider.intro" />
                                        <div class="button-group mt--30">
                                            <a class="btn-default" :href="`/video-detail/${slider.vid}`">
                                                前往观看
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </VueSlickCarousel>
        </div>
        <!-- </VueSlickCarousel> -->
        <!-- </div> -->
        <!-- End Slider Area -->

        <div class="rn-blog-details-area">

            <div class="blog-details-content pt--60 rn-section-gapBottom" v-for=" region in regions" >
                <div class="container">
                    <RegionVideoForHome column="col-lg-4 col-md-6 col-12 mt--30"
                        button-class="btn btn-default btn-large btn-icon round"  
                        :RegionTitle="region.title"
                        />

                </div>
            </div>
            
        </div>


    </Layout>
</template>

<script>
import Layout from '../components/common/Layout'
import Separator from '../components/elements/separator/Separator'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
import ServiceOne from '../components/elements/service/ServiceOne'
import AboutFour from '../components/elements/about/AboutFour'
import VueSlickCarousel from 'vue-slick-carousel'
import BlogPostMixin from '../mixins/BlogPostMixin'
import BlogPost from '../components/blog/BlogPost'
import Gallery from '../components/elements/gallery/Gallery'
import Testimonial from '../components/elements/testimonial/Testimonial'

import SliderVideoForHome from '../components/elements/video/SliderVideoForHome'
import RegionVideoForHome from '../components/elements/video/RegionVideoForHome'

export default {
    name: "HomePage",
    components: {
        SliderVideoForHome, RegionVideoForHome, 
        Testimonial,
        Gallery, BlogPost, AboutFour, ServiceOne, SectionTitle, Separator, Layout, VueSlickCarousel
    },
    mixins: [BlogPostMixin],
    data() {
        return {
            regions: [
                {
                    title: 'animation'
                },
                {
                    title: 'dance'
                },
                {
                    title: 'tec'
                },
                {
                    title: 'movie'
                },

            ],
            sliderSetting: {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                responsive: [
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 580,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            },
            sliderData: [
                {
                    image: 'bg-image-7',
                    title: 'Summer Season.',
                    description: `We help our clients succeed by creating brand identities, <br /> digital experiences, and print materials.`
                },
                {
                    image: 'bg-image-8',
                    title: 'Winter Season.',
                    description: `We help our clients succeed by creating brand identities, <br /> digital experiences, and print materials.`
                },
                {
                    image: 'bg-image-9',
                    title: 'Startup Agency.',
                    description: `We help our clients succeed by creating brand identities, <br /> digital experiences, and print materials.`
                },
            ],
            galleryData: [
                {
                    id: 1,
                    thumb: require(`@/assets/images/portfolio/portfolio-01.jpg`),
                    src: require(`@/assets/images/portfolio/portfolio-01.jpg`),
                    type: 'image'
                },
                {
                    id: 2,
                    thumb: require(`@/assets/images/portfolio/portfolio-02.jpg`),
                    src: 'https://www.youtube.com/watch?v=d0tU18Ybcvk',
                    type: 'video'
                },
                {
                    id: 3,
                    thumb: require(`@/assets/images/portfolio/portfolio-03.jpg`),
                    src: require(`@/assets/images/portfolio/portfolio-03.jpg`),
                    type: 'image'
                },
                {
                    id: 4,
                    thumb: require(`@/assets/images/portfolio/portfolio-04.jpg`),
                    src: require(`@/assets/images/portfolio/portfolio-04.jpg`),
                    type: 'image'
                },
                {
                    id: 5,
                    thumb: require(`@/assets/images/portfolio/portfolio-05.jpg`),
                    src: require(`@/assets/images/portfolio/portfolio-05.jpg`),
                    type: 'image'
                },
                {
                    id: 6,
                    thumb: require(`@/assets/images/portfolio/portfolio-06.jpg`),
                    src: require(`@/assets/images/portfolio/portfolio-06.jpg`),
                    type: 'image'
                }
            ],
            testimonialData: [
                {
                    form: 'Poland',
                    description: 'What I am primarily looking for with new projects is a fit on both a visual and aesthetic level as well as on a personal level with the client.',
                    name: 'John Due',
                    subtitle: 'App Developer',
                    image: 'testimonial-dark-01'
                },
                {
                    form: 'Germany',
                    description: 'What I am primarily looking for with new projects is a fit on both a visual and aesthetic level as well as on a personal level with the client.',
                    name: 'John Due',
                    subtitle: 'App Developer',
                    image: 'testimonial-dark-02'
                },
                {
                    form: 'USA',
                    description: 'What I am primarily looking for with new projects is a fit on both a visual and aesthetic level as well as on a personal level with the client.',
                    name: 'Janen',
                    subtitle: 'App Developer',
                    image: 'testimonial-dark-03'
                },
            ]
        }
    },
    mounted() {
        this.getSliderData();
    },
    methods: {
        getSliderData() {

            this.$axios.get(`/video/home/slider/weekly/views/1/3`).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.sliderData = res.data.datas;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },

    }
}
</script>