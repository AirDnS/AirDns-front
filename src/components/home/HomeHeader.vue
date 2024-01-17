<template>
  <v-app-bar fixed>
    <v-icon class="v-icon">mdi-desk</v-icon>
    <v-app-bar-title>airDnS</v-app-bar-title>
    <v-btn variant="outlined" class = "login-btn" v-on:click="goLogin">
      Login
    </v-btn>
    <v-btn variant="outlined" class = "logout-btn" v-on:click="goLogout">
      Logout
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
    goLogout() {
      window.location.href = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect&mode=unlink";
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