<template>
  <div class="d-flex align-center justify-center" style="height: 650px">
    <v-sheet width="400" class="mx-auto">
      <v-btn variant="outlined" block class="mt-2" v-on:click="kakaoLogin">
          kakao Login
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>

export default {
  data() {
  },
  methods: {
    kakaoLogin() {
      window.location.href = "http://43.200.245.57:8080/oauth2/authorization/kakao?redirect_uri=http://airdns.s3-website.ap-northeast-2.amazonaws.com/login/oauth2/redirect&mode=login";
    },
  },
};
</script>
<style scoped>
</style>