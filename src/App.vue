<template>
  <div id="app">
    <v-app>
      <v-main ma="4">
        <router-view name="header"></router-view>
        <v-container fluid class="page-wrapper">
          <router-view></router-view>
        </v-container>
        <router-view name="footer"></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {}
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
  display: flex;
  justify-content: center;
}

</style>

