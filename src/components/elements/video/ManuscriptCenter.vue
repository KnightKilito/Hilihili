<template>
    <div>
        <div class="row row--15">
            <div class="col-lg-12">
                <ul class="nav nav-pills rwt-portfolio-filter filter-button-default liststyle mb--20" id="pills-tab"
                    role="tablist" data-aos="fade-up">
                    <li class="nav-item list-item" role="presentation" v-for="(filter, index) in filters"
                        :key="`tab-button-${filter.id}`">
                        <button class="nav-link" :class="{ 'active': index === 0 }" :id="`pills-${filter.text}-tab`"
                            data-bs-toggle="pill" :data-bs-target="`#pills-${filter.text}`" type="button" role="tab"
                            :aria-controls="`pills-${filter.text}`"
                            :aria-selected="index === activeTab ? 'true' : 'false'" @click="activeTab = index">
                            {{ filter.text }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade" :class="{ 'show active': index === 0 }" :id="`pills-${filter.text}`"
                role="tabpanel" :aria-labelledby="`pills-${filter.text}-tab`" v-for="(filter, index) in filters"
                :key="`tab-pane-${filter.id}`">
                <div class="row row--15">
                    <template v-if="filter.text === '视频投稿'">
                        <div class="row">
                            <div class="col-lg-8 offset-lg-2">
                                <div class="content">

                                    <!-- Start Contact Form Area  -->
                                    <UploadVideo />
                                    <!-- End Contact Form Area  -->
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <template v-if="filter.text !== '视频投稿' && filter.text === '稿件管理'">

                    <ManuscriptManagement />

                </template>
                <template v-if="filter.text !== '视频投稿' && filter.text === '过审稿件'">

                    <div class="row row--15">
                        <div class="col-lg-12 text-center">
                            <div class="rwt-load-more text-center mt--60" data-aos="fade-up">
                                <a :class="buttonClass" :href="`/space/${username}`">
                                    Load More
                                    <Icon name="loader" icon-class="icon" />
                                </a>
                            </div>
                        </div>
                    </div>

                </template>
            </div>
        </div>

    </div>
</template>

<script>
import Icon from '../../icon/Icon'
import UploadVideo from '../../elements/video/UploadVideo'
import ManuscriptManagement from './ManuscriptManagement'
import { getCookie } from '../../utils/cookieUtil'

export default {
    name: 'ManuscriptCenter',
    components: { Icon, UploadVideo, ManuscriptManagement },
    props: {
        portfolioData: {},
        buttonClass: {
            type: String,
            default: 'btn btn-default btn-large btn-icon'
        },
        column: {
            type: String,
            default: 'col-lg-6 col-md-6 col-sm-12 col-12 mt--30'
        }
    },
    data() {
        return {
            filters: [
                {
                    id: 1,
                    text: '视频投稿',
                },
                {
                    id: 2,
                    text: '稿件管理',
                },
                {
                    id: 3,
                    text: '过审稿件',
                },

            ],
            activeFilter: '',
            activeTab: 0,
            username: getCookie("username")
        }
    }
}
</script>