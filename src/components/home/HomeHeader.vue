<template>
  <v-app-bar fixed>
    <v-icon class="v-icon">mdi-desk</v-icon>
    <v-app-bar-title>airDnS</v-app-bar-title>
    <v-btn variant="outlined" class = "login-btn" v-on:click="goUserDetail">
      회원정보
    </v-btn>
    <v-btn variant="outlined" class = "login-btn" v-on:click="goLogin">
      Login
    </v-btn>
  </v-app-bar>
</template>
<script>
import router from "@/routers";

export default {
  methods: {
    goLogin() {
      router.push('login')
    },
    goUserDetail() {
      router.push('userdetail')
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