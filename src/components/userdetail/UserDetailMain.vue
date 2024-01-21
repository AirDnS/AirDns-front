<template>
  <div>
    <header>
      <h1>회원 정보</h1>
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
              readonly
              dense
              style="width: 100%; margin-right: 20px;"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6" class="margin-bottom">
          <v-text-field
              v-model="user.email"
              label="이메일"
              variant="solo"
              readonly
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
              readonly
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
              readonly
              dense
              style="width: 100%; margin-right: 20px;"
          ></v-text-field>
        </v-col>
      </v-row>
        </div>
      </div>
    </main>
    <footer>
      <button @click="goBack" class="bordered-button">뒤로 가기</button>
      <button @click="updateProfileOnBackend" class="bordered-button">유저 정보 수정</button>
      <button @click="updateRoleOnBackend" class="bordered-button">권한 변경</button>
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
        email: "",
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
        window.alert('토큰이 존재하지 않습니다.');
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
    goBack() {
      router.push('/');
    },
    updateProfileOnBackend() {
      router.push('updateuserinfo');
    },
    updateRoleOnBackend() {
      const accessToken = localStorage.getItem('accessToken');

      axios.patch('http://43.200.245.57:8080/api/v1/users/role', {
      }, {
        headers: {
          'Authorization': `${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
          .then(response => {
            window.alert("권한 변경 성공");
            console.log(response.data);
          })
          .catch(error => {
            window.alert("권한 변경 실패");
            console.error(error);
          });
    },
  },
};
</script>


<style scoped>
.margin-bottom {
  margin-bottom: 10px; /* 아래 여백 값으로 조절 */
}
.user-info-container {
  border: 1px solid #ccc; /* 상자에 테두리 추가, 선택사항 */
  padding: 20px; /* 상자에 안쪽 여백 추가, 선택사항 */
  max-width: 1200px; /* 최대 너비 지정 */
  margin: auto; /* 가운데 정렬을 위한 자동 마진 추가 */
}
.bordered-button {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
