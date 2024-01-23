<template>
  <v-app-bar fixed>
    <v-icon class="v-icon">mdi-desk</v-icon>
    <v-app-bar-title>airDnS</v-app-bar-title>
    <v-btn variant="outlined" class = "login-btn" v-on:click="goCreateRoom" v-show="isHost">
      방등록
    </v-btn>
    <v-btn variant="outlined" class="userDetail-btn" v-on:click="goUserDetail" v-show="hasUser">
      회원정보
    </v-btn>
    <v-btn variant="outlined" class="logout-btn" v-on:click="goLogout" v-show="hasUser">
      Logout
    </v-btn>
    <v-btn variant="outlined" class="login-btn" v-on:click="goLogin" v-show="!hasUser">
      Login
    </v-btn>
  </v-app-bar>
</template>
<script>
import router from "@/routers";

export default {
  data() {
    return {
      hasUser: false,
      isHost: false,
    }
  },
  mounted() {
    if (localStorage.getItem('accessToken') != null) {
      this.hasUser = true;
      console.log(JSON.parse(localStorage.getItem('userInfo'))["role"]);
      if (JSON.parse(localStorage.getItem('userInfo'))["role"] === "HOST") {
        this.isHost = true;
      }
    }
  },
  methods: {
    goLogin() {
      router.push('login')
    },
    goLogout() {
        window.location.href = process.env.VUE_APP_API_URL + "/oauth2/authorization/kakao?redirect_uri=" + process.env.VUE_APP_URL + "/unlink/oauth2/redirect&mode=unlink";
    },
    goUserDetail() {
      router.push('userdetail')
    },
    goCreateRoom() {
      router.push({name:'CreateRoom'})
    }
  }
}
</script>

<style>
.login-btn {
  margin-right: 24px;
}

.logout-btn {
  margin-right: 24px;
}

.userDetail-btn {
  margin-right: 24px;
}

.v-toolbar__content {
  padding-left: 20px;
}

</style>