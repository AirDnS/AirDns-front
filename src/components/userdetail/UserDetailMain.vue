<template>
    <v-row class="user-info-container" ma="3">
      <v-col>
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
      </v-col>
    </v-row>
    <v-footer>
      <v-btn @click="goBack" class="bordered-button">뒤로 가기</v-btn>
      <v-btn @click="updateProfileOnBackend" class="bordered-button">유저 정보 수정</v-btn>
      <v-btn @click="updateRoleOnBackend" class="bordered-button">권한 변경</v-btn>
    </v-footer>
</template>

<script>
import router from "@/routers";
import axios from "@/axios";

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
            axios.get('/api/v1/users', {
              withCredentials: true,
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
            axios.patch('/api/v1/users/role', {}, {
              withCredentials: true
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
    }
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
