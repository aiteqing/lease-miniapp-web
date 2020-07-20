<template>
    <div>
        <van-cell-group>
            <van-field
                    v-model="phone"
                    label="手机号"
                    type="tel"
                    placeholder="请输入手机号">
            </van-field>


            <van-field
                    v-model="password"
                    class="count-down-cell"
                    center
                    clearable
                    type="digit"
                    label="密码"
                    placeholder="请输入密码">
            </van-field>

            <van-field
                    v-if="isLoginType"
                    v-model="password_confirm"
                    class="count-down-cell"
                    center
                    clearable
                    type="digit"
                    label="确认密码"
                    placeholder="请输入密码">
            </van-field>

        </van-cell-group>
        <div class="sign-wrap">
            <div class="register" v-if="isLoginType" @click="changeLogin">已有账号？点击登录</div>
            <div class="register" v-else @click="changeLogin">未注册？点击注册</div>
        </div>
        <van-row class="btns">
            <van-button round type="info" size="large" v-if="isLoginType" @click="register">注册</van-button>
            <van-button round type="info" size="large" v-else @click="login">登录</van-button>
        </van-row>
    </div>
</template>

<script>
    import {isRegister, register, login} from '../api/user';

    export default {
        name: "login",
        data() {
            return {
                isLoginType: true,
                phone: '17521330398',
                password: '271314',
                password_confirm: '271314'
            }
        },
        created() {
            if (!!window.localStorage.getItem('userUid')) {
                this.$router.push({
                    name: 'Index'
                })
            }
        },
        mounted() {
        },
        methods: {
            changeLogin: function () {
                this.isLoginType = this.isLoginType ? false : true;
            },
            check: function () {
                var errMsg = '';
                if (!this.phone) {
                    errMsg = '请输入手机号码';
                } else if (!this.password) {
                    errMsg = '请输入密码';
                } else if (!this.isLoginType && !this.password_confirm) {
                    errMsg = '请输入确认密码';
                } else if (!this.isLoginType && (this.password_confirm != this.password)) {
                    errMsg = '确认密码和密码不一致';
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
            //注册
            register: function () {
                var _this = this;
                if (!_this.check()) {
                    return;
                }

                //查看是否注册
                isRegister({
                    phone: _this.phone
                })
                    .then((res) => {
                        if (res.code != 200) {
                            this.$notify({
                                message: res.errMsg,
                                duration: 2000,
                                background: '#ff4444'
                            });
                            return;
                        }

                        if (res.data) {
                            this.$notify({
                                message: '您已注册，请直接登录',
                                duration: 2000,
                                background: '#ff4444'
                            });
                            return;
                        } else {
                            //注册
                            register({
                                phone: _this.phone,
                                password: _this.password
                            })
                                .then((regRes) => {
                                    if (regRes.code != 200) {
                                        this.$notify({
                                            message: res.errMsg,
                                            duration: 2000,
                                            background: '#ff4444'
                                        });
                                        return;
                                    }
                                    var storage = window.localStorage;
                                    storage.setItem('userUid', regRes.user_uid);
                                    storage.setItem('userPhone', regRes.phone);
                                    storage.setItem('userPassword', regRes.password);

                                    _this.$toast({
                                        type: 'success',
                                        duration: 1500,       // 持续展示 toast
                                        forbidClick: true, // 禁用背景点击
                                        message: '注册成功',
                                        onOpened: function () {
                                            _this.$router.push({
                                                name: 'Index'
                                            })
                                        }
                                    });

                                })
                                .catch((regErr) => {
                                    this.$notify({
                                        message: '服务器异常，请稍后重试',
                                        duration: 2000,
                                        background: '#ff4444'
                                    });
                                    console.log("register regErr:", regErr);
                                });
                        }
                    })
                    .catch((err) => {
                        this.$notify({
                            message: '服务器异常，请稍后重试',
                            duration: 2000,
                            background: '#ff4444'
                        });
                    })

            },
            //登录
            login: function () {
                var _this = this;
                if (!_this.check()) {
                    return;
                }

                login({
                    phone: _this.phone,
                    password: _this.password
                })
                    .then((res) => {
                        if (res.code != 200) {
                            this.$notify({
                                message: res.errMsg,
                                duration: 2000,
                                background: '#ff4444'
                            });
                            return;
                        }
                        var storage = window.localStorage;
                        storage.setItem('userUid', res.user_uid);
                        storage.setItem('userPhone', res.phone);
                        storage.setItem('userPassword', res.password);

                        _this.$toast({
                            type: 'success',
                            duration: 1500,       // 持续展示 toast
                            forbidClick: true, // 禁用背景点击
                            message: '登录成功',
                            onOpened: function () {
                                _this.$router.push({
                                    name: 'Index'
                                })
                            }
                        });

                    })
                    .catch((err) => {
                        this.$notify({
                            message: '服务器异常，请稍后重试',
                            duration: 2000,
                            background: '#ff4444'
                        });
                        console.log("login err:", err);
                    });
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

    .count-down {
        color: #26a2ff;
        font-size: 32px;
    }

    .sign-wrap {
        font-size: 24px;
        text-align: right;
        padding: 20px 30px 10px;
    }

    .sign-wrap .register {
        color: #999;
    }
</style>
