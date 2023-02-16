<template>
    <div class="newsletter-area rn-newsletter-default">
        <div class="container">
            <div class="row row--0 newsletter-wrapper align-items-center border-top-bottom">
                <div class="col-lg-4">
                    <div class="newsletter-section-title">
                        <h3 class="title">订阅消息</h3>
                        <p class="description">别错过闪闪的最新消息！</p>
                    </div>
                </div>
                <div class="col-lg-8">
                    <form class="rn-newsletter mt_md--20 mt_sm--20" action="#">
                        <div class="form-group">
                            <input type="email" placeholder="Email Address" />
                        </div>
                        <div class="form-group">
                            <button class="btn-default">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Newsletter'
    }
</script>