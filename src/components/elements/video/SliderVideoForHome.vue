<template>
    <div class="slider-area slider-style-4 slider-dot rn-slick-dot rn-slick-arrow">
        <VueSlickCarousel v-bind="sliderSetting">
            <div v-for="(slider, index) in sliderData" :key="index" class="single-slide">
                <div class="height-950 bg-overlay bg_image" :style="{ 'background-image': `url(${slider.cover})` }">
                    <div class="container">
                        <div class="row row--30 align-items-center">
                            <div class="col-12">
                                <div class="inner text-center">
                                    <h1 class="title" v-html="slider.title" />
                                    <p class="description" v-html="slider.intro" />
                                    <div class="button-group mt--30">
                                        <a class="btn-default" :href="`/video-detail/${slider.vid}`">
                                            εεΎθ§η
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
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
    name: 'SliderVideoForHome',
    components: { VueSlickCarousel },

    data() {
        return {
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
                    // vid: '',
                    // cover: '',
                    // uptime: '',
                    // title: 'θ§ι’ζη¨Ώ',
                    // uploader: '',
                    // intro: '',
                    // videoStatus: '',
                }

            ],
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
                        title: 'ζε‘ε¨ζΆζ―',
                        message: res.data.message
                    });
                }
            })
        },

    }
}
</script>