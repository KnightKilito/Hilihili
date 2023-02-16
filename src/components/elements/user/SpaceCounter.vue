<template>
    <div v-if="counterStyle === 1" class="row">
        <div :class="`${column}`" v-for="(counter, index) in counterData" :key="index">
            <div :class="`count-box counter-style-1 ${checkTextAlign}`">
                <VisibilitySensor @change="onChange">
                    <div class="count-number">
                        <countTo :endVal="status ? counter.number : 0" :autoplay="countUp" :duration="3000" />
                    </div>
                </VisibilitySensor>
                <h5 class="title">{{ counter.title }}</h5>
            </div>
        </div>
    </div>

    <div v-else-if="counterStyle === 2" class="row">
        <div :class="`${column}`" v-for="(counter, index) in counterData" :key="index">
            <div :class="`count-box counter-style-2 ${checkTextAlign}`">
                <VisibilitySensor @change="onChange">
                    <div class="count-number">
                        <countTo :endVal="status ? counter.number : 0" :autoplay="countUp" :duration="3000" />
                    </div>
                </VisibilitySensor>
                <h5 class="title">{{ counter.title }}</h5>
                <p class="description">{{ counter.description }}</p>
            </div>
        </div>
    </div>

    <div v-else-if="counterStyle === 3" class="row">
        <div :class="`${column}`" v-for="(counter, index) in counterData" :key="index">
            <div :class="`count-box counter-style-2 color-variation ${checkTextAlign}`">
                <VisibilitySensor @change="onChange">
                    <div class="count-number">
                        <countTo :endVal="status ? counter.number : 0" :autoplay="countUp" :duration="3000" />
                    </div>
                </VisibilitySensor>
                <h5 class="title">{{ counter.title }}</h5>
                <p class="description">{{ counter.description }}</p>
            </div>
        </div>
    </div>

    <div v-else-if="counterStyle === 4" class="row">
        <div :class="`${column}`" v-for="(counter, index) in counterData" :key="index">
            <div :class="`count-box counter-style-2 border-style ${checkTextAlign}`">
                <VisibilitySensor @change="onChange">
                    <div class="count-number">
                        <countTo :endVal="status ? counter.number : 0" :autoplay="countUp" :duration="3000" />
                    </div>
                </VisibilitySensor>
                <h5 class="title">{{ counter.title }}</h5>
                <p class="description">{{ counter.description }}</p>
            </div>
        </div>
    </div>

    <div v-else-if="counterStyle === 5" class="row">
        <div :class="`${column}`" v-for="(counter, index) in counterData" :key="index">
            <div :class="`count-box counter-style-4 ${checkTextAlign}`">
                <VisibilitySensor @change="onChange">
                    <div class="count-number">
                        <countTo :endVal="status ? counter.number : 0" :autoplay="countUp" :duration="3000" />
                    </div>
                </VisibilitySensor>
                <h5 class="counter-title">{{ counter.title }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
import VisibilitySensor from 'vue-visibility-sensor'
import countTo from 'vue-count-to'

export default {
    name: 'SpaceCounter',
    components: { VisibilitySensor, countTo },
    props: {
        column: {},

        counterStyle: {
            type: Number,
            default: 1
        },
        textAlign: {
            type: String,
            default: 'left'
        }
    },
    data() {
        return {
            countUp: true,
            status: false,
            counterData: [
                {
                    number: 199,
                    title: '动画区',
                },
                {
                    number: 575,
                    title: '舞蹈区',
                },
                {
                    number: 69,
                    title: '科技区',
                },
                {
                    number: 500,
                    title: '电影区',
                }
            ],
        }
    },
    computed: {
        checkTextAlign() {
            if (this.textAlign === 'left') return 'text-start';
            else if (this.textAlign === 'center') return 'text-center';
            else if (this.textAlign === 'end') return 'text-end';
            else return '';
        }
    },
    mounted: function () {
        this.getInfo();
    },
    methods: {
        onChange(isVisible) {
            if (isVisible) {
                this.status = true;
            }
        },
        getInfo() {
            var routeUsername = this.$route.params.username;
            this.$axios.get("/user/username/" + routeUsername).then(res => {
                console.log(res);
                if (res.data.state == 0) {
                    this.userForm = res.data.data;
                    this.counterData[0].number = this.userForm.preference_animation;
                    this.counterData[1].number = this.userForm.preference_dance;
                    this.counterData[2].number = this.userForm.preference_tec;
                    this.counterData[3].number = this.userForm.preference_movie;
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