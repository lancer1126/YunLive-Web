<template>
  <div class="cover-row">
    <div v-for="(cover, index) in coverList" :key="index" class="cover">
      <Cover :img-url="getImgUrl(cover)"/>
      <div class="text">
        <div class="title">
          <router-link to="getRoomLink(room)">{{cover.ownerName}}</router-link>
        </div>
        <div class="room-name">
          <span>{{ cover.roomName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from "@/components/Cover";
export default {
  name: 'CoverRow',
  components: {Cover},
  props: ['coverList'],
  data() {
    return {
      newBlank: true
    }
  },
  methods: {
    getRoomLink(cover) {
      return cover.roomName
    },
    getImgUrl(cover) {
      return cover.ownerName
    }
  }
}
</script>

<style scoped>
.cover-row {
  color: #b896c4;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 44px 24px;
}

.cover {
  color: black;
}

.text {
  margin-top: 8px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
}

.room-name{
  font-size: 14px;
  opacity: 0.68;
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
}
</style>
