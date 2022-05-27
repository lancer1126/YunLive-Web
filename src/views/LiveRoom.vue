<template>
  <div class="room-main-container">

    <div class="room-left">
<!--      todo 直播间主体内容-->
    </div>

    <div class="room-right">
      <div class="room-right-top">
        <div class="room-right-top">直播聊天</div>
        <div class="room-right-body">
<!--        todo 弹幕列表-->
        </div>
      </div>
      <div v-if="!isBottom" @click="toBottom()" class="to-bottom">返回底部</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isBottom: true
    }
  },
  methods: {
    toBottom() {
      let _this = this
      _this.$nextTick(() => {
        let container = document.getElementsByClassName("room-right-body")[0]
        container.scrollTop = container.scrollHeight
      })
      this.isBottom = true
    }
  }
}
</script>

<style scoped>
.room-main-container {
  height: 100%;
  width: 100%;
}

.room-left {
  position: relative;
  width: 70%;
  height: 100%;
}

.room-right {
  position: fixed;
  width: 22%;
  height: 92%;
  top: 50px;
  border-left: 1px solid #c8c8c9;
}

.room-right-top {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #c8c8c9;
}
.room-right-body{
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  top: 40px;
}
.to-bottom{
  cursor: pointer;
  background-color: #4e4c4c;
}
</style>
