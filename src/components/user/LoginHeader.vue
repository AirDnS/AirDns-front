<template>
  <v-app-bar fixed>
    <v-icon class="v-icon">mdi-desk</v-icon>
    <v-app-bar-title>airDnS</v-app-bar-title>
  </v-app-bar>
</template>
<script>
import router from "@/routers";

export default {
  methods: {
    goLogin() {
      router.push('login')
    }
  }
}
</script>

<style>
.login-btn {
  margin-right: 24px;
}
.v-icon {
  padding-left: 20px;
}

</style>