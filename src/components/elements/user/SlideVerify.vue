<template>
    <div style="text-align: center;" class="col-md-12 col-12">
        <slide-verify ref="slideblock" @again="onAgain" @fulfilled="onFulfilled" @success="onSuccess" @fail="onFail"
            @refresh="onRefresh" :slider-text="text" :accuracy="accuracy"></slide-verify>
        <!-- <button @click="handleClick">在父组件可以点我刷新哦</button> -->
        <div>{{ msg }}</div>
    </div>
</template>
  
<script>
export default {
    name: 'App',
    data() {
        return {
            msg: '',
            text: '向右滑动->',
            // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
            accuracy: 3,
        }
    },
    methods: {
        
        onSuccess(times) {
            console.log('验证通过，耗时 ' + times + '毫秒');
            this.msg = 'login success, 耗时'+(times / 1000).toFixed(1)+'s';
            // 要嵌套三层……md
            this.$parent.$parent.$parent.login();
            // this.$parent.$parent.$parent.$parent.hideChildLogin();
            this.$refs.slideblock.reset();
        },
        onFail() {
            console.log('验证不通过');
            this.msg = ''
        },
        onRefresh() {
            console.log('点击了刷新小图标');
            this.msg = ''
        },
        onFulfilled() {
            console.log('刷新成功啦！');
        },
        onAgain() {
            console.log('检测到非人为操作的哦！');
            this.msg = 'try again';
            // 刷新
            this.$refs.slideblock.reset();
        },
        handleClick() {
            this.$refs.slideblock.reset();
        },
    }
}
</script>