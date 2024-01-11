<template>
  <div id="app">
    <v-app>
      <HomeHeader></HomeHeader>
      <v-main class = "Room">
        <RoomMain></RoomMain>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import RoomMain from "@/components/Room/RoomMain.vue";

export default {
  components: {
    "HomeHeader": HomeHeader,
    "RoomMain": RoomMain,
  }
}
</script>

<style>
.Room{
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%,-50%);
}
</style>
