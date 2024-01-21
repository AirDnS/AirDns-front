<template>
  <div>
    <header>
      <h1>회원 정보 수정</h1>
    </header>
    <main>
      <div>
        <div class="user-info-container">
          <v-row justify="center">
            <v-col cols="12" md="6" class="margin-bottom">
              <v-text-field
                  v-model="user.nickname"
                  label="이름"
                  variant="solo"
                  dense
                  style="width: 100%; margin-right: 20px;"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6" class="margin-bottom">
              <v-text-field
                  v-model="user.address"
                  label="주소"
                  variant="solo"
                  dense
                  style="width: 100%; margin-right: 20px;"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6" class="margin-bottom">
              <v-text-field
                  v-model="user.contact"
                  label="연락처"
                  variant="solo"
                  dense
                  style="width: 100%; margin-right: 20px;"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
    </main>
    <footer>
      <button @click="updateUserInfo" class="bordered-button">회원 정보 수정</button>
      <button @click="goBack" class="bordered-button">뒤로 가기</button>
    </footer>
  </div>
</template>

<script>
import router from "@/routers";
import axios from "axios";

export default {
  data() {
    return {
      user: {
        nickname: "",
        address: "",
        contact: ""
      },
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert('토큰이 존재하지 않습니다.');
        return;
      }

      axios.get('http://43.200.245.57:8080/api/v1/users', {
        headers: {
          'Authorization': `${accessToken}`,
        },
      })
          .then(response => {
            console.log(response.data);
            this.user = response.data.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateUserInfo() {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        window.alert('토큰이 존재하지 않습니다.');
        return;
      }

      axios.patch('http://43.200.245.57:8080/api/v1/users/profile', this.user, {
        headers: {
          'Authorization': `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
          .then(response => {
            console.log(response.data);
            window.alert("회원 정보가 수정되었습니다.");
            router.push('/');
          })
          .catch(error => {
            window.alert("회원 정보 수정 실패");
            console.error(error);
          });
    },
    goBack() {
      router.push('/');
    },
  },
};
</script>

<style scoped>
.margin-bottom {
  margin-bottom: 10px;
}
.user-info-container {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}
.bordered-button {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
