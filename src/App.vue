<template>
  <div id="home">
    <HomeHeader></HomeHeader>
    <HomeSearch></HomeSearch>
    <StudyRoomList></StudyRoomList>
    <HomeFooter></HomeFooter>
  </div>
</template>

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import HomeSearch from "@/components/Home/HomeSearch.vue";
import StudyRoomList from "@/components/Home/StudyRoomList.vue";
import HomeFooter from "@/components/Home/HomeFooter.vue";

export default {
  components: {
    "HomeHeader": HomeHeader,
    "HomeSearch": HomeSearch,
    "StudyRoomList": StudyRoomList,
    "HomeFooter": HomeFooter
  }
}
</script>
