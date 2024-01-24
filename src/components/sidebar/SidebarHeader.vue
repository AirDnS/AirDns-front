<template>
  <v-navigation-drawer
    left
    :permanent="$vuetify.display.mdAndUp"
    elevation="10"
    app
    :temporary="$vuetify.display.mdAndDown"
    v-model="drawer"
    expand-on-hover
  >
    <UserSidebar />
  </v-navigation-drawer>
  <v-app-bar elevation="0" class="v-topbar">
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
  </v-app-bar>
</template>
<script>
import UserSidebar from "../sidebar/UserSidebar.vue";

const innerW = window.innerWidth;

export default {
  data() {
    return {
      drawer: {
        value: true
      }
    }
  },
  mounted() {
    if (innerW < 950) {
      this.drawer.value = !this.drawer.value;
    }
  },
  components: { UserSidebar }
}
</script>
<style>

</style>