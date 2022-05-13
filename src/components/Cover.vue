<template>
  <div class="cover" @mouseover="focus= true" @mouseleave="focus = false" @click="clickToLiveRoom">
    <div class="cover-container">
      <img :src="imgUrl"  alt=""/>
      <transition name="fade">
        <div class="shadow" :style="shadowStyles"></div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {type: String, required: true}
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    shadowStyles() {
      return {
        backgroundImage: `url(${this.imgUrl})`
      }
    }
  },
  methods: {
    clickToLiveRoom() {
      // this.$router.push()
    }
  }
}
</script>

<style scoped>
.cover {
  position: relative;
  transition: transform 0.3s;
}

.cover:hover {
  cursor: pointer;
}
.cover-container{
  position: relative;
}
.shadow{
  position: absolute;
  top: 12px;
  height: 100%;
  width: 100%;
  filter: blur(16px) opacity(0.6);
  transform: scale(0.92, 0.96);
  z-index: -1;
  background-size: cover;
  border-radius: 0.75em;
  aspect-ratio: 1 / 1;
}
</style>
