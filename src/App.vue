<template>
  <div id="app">
    <v-app>
      <header>
        <HomeHeader></HomeHeader>
      </header>
      <main>
          <RoomMain></RoomMain>
      </main>
      <footer>
        <HomeFooter>
        </HomeFooter>
      </footer>
    </v-app>
  </div>
</template>

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import RoomMain from "@/components/Room/RoomMain.vue";
import HomeFooter from "@/components/Home/HomeFooter.vue";

export default {
  components: {
    "HomeHeader": HomeHeader,
    "RoomMain": RoomMain,
    "HomeFooter": HomeFooter
  }
}
</script>

<style>
header {
  height: 60px;
}

main {
  min-height: 700px;
}

footer {
  height: 60px;
}
</style>
