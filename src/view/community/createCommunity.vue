<template>
    <div>
        <van-cell-group>
            <van-field
                    v-model="community_name"
                    label="小区名称"
                    type="tel"
                    placeholder="请输入小区名称">
            </van-field>


            <van-field
                    v-model="address"
                    class="count-down-cell"
                    label="小区地址"
                    placeholder="请输入小区地址">
            </van-field>

        </van-cell-group>

        <van-row class="btns">
            <van-button round type="info" size="large" @click="submit">保存</van-button>
        </van-row>
    </div>
</template>

<script>
    import {createCommunity} from "../../api/community";

    export default {
        name: "createCommunity",
        data() {
            return {
                community_name: '',
                address: ''
            }
        },
        methods: {
            submit: function () {
                var _this = this;
                var errMsg = '';
                if (!_this.community_name) {
                    errMsg = '请输入小区名称';
                } else if (!_this.address) {
                    errMsg = '请输入小区地址';
                }

                if (!!errMsg) {
                    this.$notify({
                        message: errMsg,
                        duration: 2000,
                        background: '#ff4444'
                    });
                    return;
                }

                _this.$toast.loading({
                    duration: 0
                })

                createCommunity({
                    community_name: _this.community_name,
                    address: _this.address,
                    user_uid: _this.$store.state.userUid
                })
                    .then((res) => {
                        console.log('createCommunity res', res);
                        _this.$toast.clear();
                        if (res.code != 200) {
                            _this.$notify({
                                message: res.errMsg,
                                duration: 2000,
                                background: '#ff4444'
                            });
                            return;
                        }

                        _this.$toast({
                            type: 'success',
                            duration: 1500,       // 持续展示 toast
                            forbidClick: true, // 禁用背景点击
                            message: '添加成功',
                            onOpened: function () {
                                _this.$router.push({
                                    name: 'Index'
                                })
                            }
                        });
                    })
                    .catch((err) => {
                        _this.$toast.clear();
                        _this.$notify({
                            message: '服务器异常，请稍后再试',
                            duration: 2000,
                            background: '#ff4444'
                        });
                        console.log('createCommunity err', err);
                    })
            }
        }
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
