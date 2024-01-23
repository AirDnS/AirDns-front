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
      window.location.href = process.env.VUE_APP_API_URL + "/oauth2/authorization/kakao?redirect_uri=" + process.env.VUE_APP_URL + "/login/oauth2/redirect&mode=login";
    },
  },
};
</script>
<style scoped>
</style>