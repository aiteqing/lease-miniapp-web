<template>
    <div>
        <van-field
                label="小区名称"
                readonly
                v-model="tenantData.community_name"
                placeholder="请输入小区名称">
        </van-field>
        <van-field
                v-model="tenantData.tenant_name"
                label="姓名"
                placeholder="请输入姓名">
        </van-field>
        <van-field
                v-model="tenantData.phone"
                label="手机号"
                type="tel"
                placeholder="请输入手机号">
        </van-field>
        <van-field
                v-model="tenantData.check_in_date"
                label="入住日期"
                readonly
                @click="showDatePicker"
                placeholder="请选择入住日期">
        </van-field>

        <van-field
                v-model="tenantData.expiration_date"
                label="截止日期"
                readonly
                @click="showExpirationDatePicker"
                placeholder="请选择截止日期">
        </van-field>

        <van-field
                v-model="leaseData.leaseFeeType"
                label="交租方式"
                readonly
                @click="showLeasePicker"
                placeholder="请选择交租方式">
        </van-field>

        <van-field
                v-model="tenantData.room_address"
                label="详细住址"
                placeholder="例：3栋1单元2201 1号房">
        </van-field>

        <van-row class="btns">
            <van-button round type="info" size="large" @click="submit">保存</van-button>
        </van-row>


        <!--    日期弹框    -->
        <van-popup v-model="dateData.isShowDatePicker" position="bottom">
            <van-datetime-picker
                    v-model="dateData.currentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="dateData.minDate"
                    :max-date="dateData.maxDate"
                    @confirm="confirmDate"
                    @cancel="cancelDate"/>
        </van-popup>

        <!--    截止日期弹框    -->
        <van-popup v-model="expirationDateData.isShowDatePicker" position="bottom">
            <van-datetime-picker
                    v-model="expirationDateData.currentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="expirationDateData.minDate"
                    :max-date="expirationDateData.maxDate"
                    @confirm="confirmExpirationDate"
                    @cancel="cancelExpirationDate"/>
        </van-popup>


        <!--    交租方式弹框    -->
        <van-action-sheet
                v-model="leaseData.isShowLeasePicker"
                :actions="leaseData.leaseActions"
                cancel-text="取消"
                close-on-click-action
                @cancel="leaseCancel"
                @select="leaseSelect"
        />
    </div>
</template>

<script>
    import {formatDate} from "../../utils/formatDate";
    import {createTenant} from "../../api/tenant";

    export default {
        name: "create",
        data() {
            return {
                tenantData: {
                    community_id: this.$route.query.communityId,
                    community_name: this.$route.query.communityName,
                    check_in_date: '',
                    expiration_date: '',
                    tenant_name: '',
                    phone: '',
                    lease_fee_type: '',
                    room_address: ''
                },
                dateData: {
                    isShowDatePicker: false,
                    currentDate: new Date(),
                    minDate: new Date(1998, 1, 1),
                    maxDate: new Date(2030, 1, 1),
                },
                expirationDateData: {
                    isShowDatePicker: false,
                    currentDate: new Date(),
                    minDate: new Date(1998, 1, 1),
                    maxDate: new Date(2030, 1, 1),
                },
                leaseData: {
                    leaseFeeType: '',
                    isShowLeasePicker: false,
                    leaseActions: [{
                        name: '月',
                        value: 'TYP_MONTH'
                    }, {
                        name: '季',
                        value: 'TYP_SEASON'
                    }, {
                        name: '半年',
                        value: 'TYP_HALF_YEARLY'
                    }, {
                        name: '年',
                        value: 'TYP_YEAR'
                    }]
                }
            }
        },
        methods: {
            //控制日期弹框
            showDatePicker: function () {
                this.dateData.isShowDatePicker = true;
            },
            //日期选择确定回调
            confirmDate: function (val) {
                this.tenantData.check_in_date = formatDate(val, 'yyyy-MM-dd');
                this.dateData.isShowDatePicker = false;
            },
            //日期选择取消回调
            cancelDate: function () {
                this.dateData.isShowDatePicker = false;
            },
            //控制截止日期弹框
            showExpirationDatePicker: function () {
                this.expirationDateData.isShowDatePicker = true;
            },
            //截止日期选择确定回调
            confirmExpirationDate: function (val) {
                this.tenantData.expiration_date = formatDate(val, 'yyyy-MM-dd');
                this.expirationDateData.isShowDatePicker = false;
            },
            //截止日期选择取消回调
            cancelExpirationDate: function () {
                this.expirationDateData.isShowDatePicker = false;
            },
            //控制交租方式弹框
            showLeasePicker: function () {
                this.leaseData.isShowLeasePicker = true;
            },
            //交租方式取消回调
            leaseCancel: function () {
                this.leaseData.isShowLeasePicker = false;
            },
            //交租方式选择回调
            leaseSelect: function (res) {
                this.leaseData.leaseFeeType = res.name;
                this.tenantData.lease_fee_type = res.value;
            },
            //校验
            validate: function (data) {
                var errMsg = '';

                if (!data.community_id) {
                    errMsg = '小区uid不能为空';
                } else if (!data.community_name) {
                    errMsg = '小区名称不能为空';
                } else if (!data.tenant_name) {
                    errMsg = '姓名不能为空';
                } else if (!data.phone) {
                    errMsg = '手机号码不能为空';
                } else if (!data.check_in_date) {
                    errMsg = '入住日期不能为空';
                } else if (!data.expiration_date) {
                    errMsg = '截止日期不能为空';
                } else if (!data.lease_fee_type) {
                    errMsg = '交租方式不能为空';
                } else if (!data.room_address) {
                    errMsg = '详细地址不能为空';
                } else if (!data.user_uid) {
                    errMsg = '用户uid不能为空';
                }

                if (!!errMsg) {
                    this.$notify({
                        message: errMsg,
                        duration: 2000,
                        background: '#ff4444'
                    });
                    return false;
                }

                return true;
            },
            // 表单提交
            submit: function () {
                var _this = this;
                var submitData = Object.assign(_this.tenantData, {user_uid: _this.$store.state.userUid});

                if (!_this.validate(submitData)) {
                    return;
                }

                _this.$toast.loading({
                    duration: 0
                })

                createTenant(submitData)
                    .then((res) => {
                        console.log('createTenant res', res);
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
                                _this.$router.back()
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
                        console.log('createTenant err', err);
                    })

            }
        }
    }
</script>

<style scoped>
    .btns {
        padding: 0 20px;
        margin-top: 60px;
    }

    .btns .van-button--large {
        height: 80px;
        line-height: 80px;
    }
</style>
