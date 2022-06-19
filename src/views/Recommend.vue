<template>
  <div v-loading="loading" element-loading-background="rgba(243, 246, 248, 0.8)" class="rec-container">
    <div class="rec-big-word">首页推荐</div>
    <el-switch class="blank-switch" v-model="newBlank" inactive-text="新标签打开" @change="blankChange"/>
    <div class="rec-menu">
      <CoverRow ref="coverRow" :cover-list="coverList" :new-blank="newBlank"/>
    </div>
  </div>
</template>

<script>
import CoverRow from "@/components/CoverRow";
import {getRecommend} from "@/api/LiveRoom";

export default {
  name: 'Recommend',
  components: {CoverRow},
  data() {
    return {
      loading: false,
      newBlank: false,
      videoElement: null,
      coverList: []
    }
  },
  mounted() {
    this.$emit('activated', 0)
    this.getCover()
    this.videoElement = document.querySelector('#myVideo')
  },
  activated() {
    this.$emit('activated', 0)
  },
  methods: {
    blankChange(value) {
      localStorage.setItem("newBlank", value)
    },
    getCover() {
      this.loading = true
      getRecommend(1, 20)
          .then(resp => {
            if (resp.data.code === 200) {
              let cs = resp.data.data
              cs.forEach(e => {
                if (e.platform === 'bilibili') {
                  this.coverList.push(e)
                }
              })
            }
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>
.rec-container {
  height: 100%;
  width: 100%;
  position: relative;
}

.rec-big-word {
  position: absolute;
  top: 18px;
  left: 260px;
  right: 0;
  font-weight: bold;
  font-size: 40px;
}

.rec-menu {
  position: absolute;
  top: 60px;
  height: 25px;
  right: 0;
  left: 10px;
}

.blank-switch {
  position: absolute;
  top: 40px;
  right: 260px;
}
</style>
