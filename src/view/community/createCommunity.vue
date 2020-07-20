<template>
    <div>
        <van-cell-group>
            <van-field
                    label="小区名称"
                    type="tel"
                    placeholder="请输入小区名称">
            </van-field>


            <van-field
                    class="count-down-cell"
                    center
                    clearable
                    type="digit"
                    label="小区地址"
                    placeholder="请输入小区名称">
            </van-field>

        </van-cell-group>

        <van-row class="btns">
            <van-button round type="info" size="large">保存</van-button>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "createCommunity"
    }
</script>

<style scoped>
    .btns {
        padding: 0 20px;
        margin-top: 20px;
    }

    .btns .van-button--large {
        height: 80px;
        line-height: 80px;
    }
</style>
