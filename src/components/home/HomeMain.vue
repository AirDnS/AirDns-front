<template>
  <div class="box-container">
    <div class="box-item">
      <RoomSearch>
      </RoomSearch>
    </div>
    <div class="box-item">
      <RoomList>
      </RoomList>
    </div>
  </div>
</template>

<script>
import RoomSearch from "@/components/room/RoomSearch.vue";
import RoomList from "@/components/room/RoomList.vue";

export default {
  components: {
    "RoomSearch": RoomSearch,
    "RoomList": RoomList
  },



}
</script>

<style>
.box-container {
  width: 1080px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.box-item {
  width: 100%;
  height: 100%;
  font-size: 40px;
  text-align: center;
}
</style>