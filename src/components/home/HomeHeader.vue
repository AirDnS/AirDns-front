<template>
  <v-app-bar fixed>
    <RouterLink to="/" style="text-decoration: none; color: inherit;">
      <div class="airdns-logo">
        <v-icon class="v-icon">mdi-desk</v-icon>
        <v-app-bar-title>airDnS</v-app-bar-title>
      </div>
    </RouterLink>
    <v-spacer></v-spacer>
    <v-btn variant="outlined" class="login-btn" v-on:click="goCreateRoom" v-show="isHost">
      방등록
    </v-btn>
    <v-btn variant="outlined" class="login-btn" v-on:click="updateRoleOnBackend" v-show="!isHost">대여 권한 얻기</v-btn>
    <v-btn variant="outlined" class="userDetail-btn" v-on:click="goUserDetail" v-show="hasUser">
      회원 정보
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
import axios from "@/axios";

export default {
  data() {
    return {
      hasUser: false,
      isHost: false,
    }
  },
  mounted() {
    if (localStorage.getItem("userInfo") != null) {
      this.hasUser = true;
      console.log(JSON.parse(localStorage.getItem('userInfo'))["role"]);
      if (JSON.parse(localStorage.getItem('userInfo'))["role"] === "HOST") {
        this.isHost = true;
      }
    }
  },
  // 보안 상 Cookie JavaScript를 통해 관리를 하는 것은 안좋다 -> 쿠키 탈취문제(cross-site scripting XSS)
  // UserInfo를 이용한다.
  methods: {
    goLogin() {
      router.push('login')
    },
    goLogout() {
      if (localStorage.getItem("userInfo") != null) {
        window.location.href = process.env.VUE_APP_API_URL + "/oauth2/authorization/kakao?redirect_uri=" + process.env.VUE_APP_URL + "/unlink/oauth2/redirect&mode=unlink";
      } else {
        window.alert("로그인을 해야합니다!!!")
      }
    },
    goUserDetail() {
      if (localStorage.getItem("userInfo") != null) {
        router.push('userdetail')
      } else {
        window.alert("로그인을 해야합니다!!!")
      }
    },
    goCreateRoom() {
      if (JSON.parse(localStorage.getItem("userInfo")).role === "HOST") {
        router.push({name: 'CreateRoom'})
      } else {
        window.alert("권한이 없습니다.")
      }
    },
    updateRoleOnBackend() {
      axios.patch('/api/v1/users/role', {},{
        withCredentials: true
      })
          .then(response => {

            this.$swal.fire({
              title: "권한을 획득하시겠습니까?",
              text: "다시 되돌릴 수 없습니다!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "네",
              cancelButtonText: "아니오"
            }).then((swalResult) => {
              if (swalResult.isConfirmed) {

                this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
                this.userInfo.role = "HOST";
                this.isUser = false;
                localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                console.log(response.data);

                this.$swal.fire({
                    title: "권한 변경에 성공했습니다!",
                    icon: "success"
                }).then(() => {
                  router.go()
                })
                ;

              }
            });

          })
          .catch(error => {
            this.$swal.fire({
                title: "권한 변경에 실패했습니다.",
                icon: "error"
            });
            console.error(error);
          });
    },
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


</style>