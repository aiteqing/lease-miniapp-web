<template>
    <div>
        <div class="tenant-item" v-for="tenant in tenantList" :key="tenant.tenant_id">
            <div class="tenant-content">
                <div class="user-info">
                    <div class="name">{{tenant.tenant_name}}</div>
                    <div class="phone">{{tenant.phone}}</div>
                    <div class="community-name">{{communityName}}</div>
                </div>
                <div class="address">{{tenant.room_address}}</div>
            </div>
        </div>
        <div class="add-tenant" @click="addTenant"><img src="../../assets/addIcon.svg"></div>
    </div>
</template>

<script>
    import {getTenantList} from "../../api/tenant";

    export default {
        name: "index",
        data() {
            return {
                tenantList: [],
                communityName: this.$route.query.communityName
            }
        },
        created() {
            this.getTenantList();
        },
        methods: {
            addTenant: function () {
                this.$router.push({
                    name: 'createTenant',
                    query: {
                        communityId: this.$route.query.communityId,
                        communityName: this.$route.query.communityName
                    }
                })
            },
            getTenantList: function () {
                var _this = this;
                getTenantList({
                    user_uid: _this.$store.state.userUid,
                    community_id: _this.$route.query.communityId
                })
                    .then((res) => {
                        console.log('getTenantList res', res);
                        _this.tenantList = res.data;
                    })
                    .catch((err) => {
                        console.log('getTenantList err', err);
                        _this.$notify({
                            message: err.errMsg,
                            duration: 2000,
                            background: '#ff4444'
                        });
                    })
            }
        }
    }
</script>

<style scoped>
    .tenant-content {
        position: relative;
        margin: 10px 20px 20px 20px;
        padding: 20px 30px;
        text-align: left;
        background: #fff;
        border-radius: 10px;
    }

    .tenant-content .user-info {
        display: flex;
        font-size: 34px;
        line-height: 1.3;
        align-items: center;
    }

    .user-info .name {
        margin-right: 20px;
    }

    .user-info .community-name {
        font-size: 16px;
        color: #ffffff;
        background: #1989fa;
        padding: 5px 14px;
        border-radius: 20px;
        margin-left: 20px;
    }

    .tenant-content .address {
        font-size: 28px;
        color: #666;
        margin-top: 10px;
    }


    .add-tenant {
        position: fixed;
        bottom: 50px;
        right: 10px;
        width: 100px;
        height: 100px;
    }

    .add-tenant img {
        width: 100%;
        height: 100%;
    }
</style>
