<template>
    <div>
        <div class="community-item" v-for="community in communityList" :key="community.community_id">
            <div class="community-content">
                <div class="community-name">{{community.community_name}}</div>
                <div class="community-address">{{community.address}}</div>
            </div>
        </div>
        <div class="add-community" @click="createCommunity"><img src="../assets/addIcon.svg"></div>
    </div>
</template>

<script>
    import {getCommunityList} from "../api/community";

    export default {
        name: "index",
        data() {
            return {
                communityList: []
            }
        },
        created() {
            this.getCommunityList();
        },
        methods: {
            getCommunityList: function () {
                var _this = this;
                getCommunityList({
                    user_uid: _this.$store.state.userUid
                })
                    .then((res) => {
                        console.log('getCommunityList res', res);
                        _this.communityList = res.data;
                    })
                    .catch((err) => {
                        console.log('getCommunityList err', err);
                        _this.$notify({
                            message: err.errMsg,
                            duration: 2000,
                            background: '#ff4444'
                        });
                    })
            },
            createCommunity: function () {
                this.$router.push({
                    name: 'createCommunity'
                })
            }
        }
    }
</script>

<style scoped>
    .community-content {
        position: relative;
        margin: 10px 20px 20px 20px;
        padding: 0 33px 0 33px;
        height: 166px;
        text-align: left;
        background: #fff;
        border-radius: 10px;
    }

    .community-content .community-name {
        padding-top: 32px;
        font-size: 32px;
        color: #000;
    }

    .community-content .community-address {
        margin-top: 12px;
    }

    .community-content .community-address {
        font-size: 26px;
        color: #888;
    }

    .add-community {
        position: fixed;
        bottom: 50px;
        right: 10px;
        width: 100px;
        height: 100px;
    }

    .add-community img {
        width: 100%;
        height: 100%;
    }
</style>
