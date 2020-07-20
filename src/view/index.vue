<template>
    <div>
        <div class="community-item">
            <div class="community-content">
                <div class="community-name">中栋国际</div>
                <div class="community-address">萧山区北干街道</div>
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
            return {}
        },
        created() {
        },
        methods: {
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
