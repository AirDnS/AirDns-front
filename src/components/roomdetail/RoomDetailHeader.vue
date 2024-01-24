<template>
  <v-app-bar fixed>
    <v-icon class="v-icon airdns-logo">mdi-desk</v-icon>
    <v-app-bar-title v-on:click="goHome">airDnS</v-app-bar-title>
  </v-app-bar>
</template>
<script>

import router from "@/routers";

export default {
  methods : {
    goHome() {
       router.push({name:'HomePage'});
    }
  }
}
</script>

<style>

</style>