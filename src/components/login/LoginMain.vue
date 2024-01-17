<template>
  <div class="d-flex align-center justify-center" style="height: 650px">
    <v-sheet width="400" class="mx-auto">
        <v-btn type="submit" variant="outlined" block class="mt-2">Sign in</v-btn>
        <v-btn variant="outlined" block class="mt-2" v-on:click="kakaoLogin">kakao Login</v-btn>
      <div class="mt-2">
        <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
      </div>
    </v-sheet>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Your login logic here
    },
    kakaoLogin() {
      window.location.href = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect&mode=login";
    }
  },
};
</script>
<style scoped>
</style>