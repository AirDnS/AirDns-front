<template>
  <div class="d-flex align-center justify-center" style="height: 650px">
    <v-sheet width="400" class="mx-auto">
      <v-btn variant="outlined" block class="mt-2" v-on:click="kakaoLogin">
          kakao Login
      </v-btn>
      <v-btn variant="outlined" block class="mt-2" v-on:click="naverLogin">Naver Login</v-btn>
      <v-btn variant="outlined" block class="mt-2" v-on:click="googleLogin">Google Login</v-btn>
    </v-sheet>
  </div>
</template>

<script>

export default {
  data() {
  },
  methods: {
    kakaoLogin() {
      window.location.href = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login/oauth2/redirect&mode=login";
    },
    naverLogin() {
    },
    googleLogin() {
    }
  },
};
</script>
<style scoped>
</style>