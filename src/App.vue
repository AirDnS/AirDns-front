<template>
  <div id="app">
    <v-app>
      <header>
        <router-view name="header"></router-view>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <router-view name="footer"></router-view>
      </footer>
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
}

</style>

