<template>
  <div>
    <van-popup v-model="isShow" position="bottom" @click-overlay="cancel">
      <van-area :area-list="areaList"
                :columns-num="num"
                :title="title"
                :value="value"
                @confirm="confirm"
                @cancel="cancel"/>
    </van-popup>
  </div>
</template>

<script>
  import {addressData} from '../utils/addressData'

  export default {
    name: "areaPicker",
    data() {
      return {
        areaList: addressData
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false,
        required: false
      },
      num: {
        type: Number,
        default: 2
      },
      title: {
        type: String,
        default: ""
      },
      value: {
        type: String,
        default: ""
      }
    },
    methods: {
      confirm: function (e) {
        this.$emit('confirm', e);
        this.$emit('cancel', false);
      },
      cancel: function () {
        this.$emit('cancel', false);
      }
    }
  }
</script>

<style scoped>

</style>
