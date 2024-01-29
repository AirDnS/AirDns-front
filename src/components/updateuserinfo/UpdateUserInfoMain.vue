<template>
  <div>
    <div class="user-info-container">
      <v-row justify="center">
        <v-col cols="12" md="6" class="margin-bottom">
          <v-text-field
              v-model="user.name"
              label="이름"
              :rules="[rules.name]"
              variant="solo"
              dense
              style="width: 100%; margin-right: 20px;"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6" class="margin-bottom">
          <v-text-field
              v-model="user.nickname"
              label="닉네임"
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
              :rules="[rules.phone]"
              variant="solo"
              dense
              style="width: 100%; margin-right: 20px;"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6" class="margin-bottom">
          <div class="address-box">
            <v-text-field
                v-model="user.address"
                label="주소"
                variant="solo"
                dense
                style="width: 100%; margin-right: 20px;"
                readonly
            ></v-text-field>
            <v-btn variant="outlined" class="address-btn" @click="openPostcode">검색</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6" class="margin-bottom">
          <div class="submit-box">
            <v-btn @click="updateUserInfo" size="x-large" color="success" class="submit-btn">회원 정보 수정</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import router from "@/routers";
import axios from "@/axios";

export default {
  data() {
    return {
      user: {
        name: "",
        nickname: "",
        address: "",
        contact: ""
      },
      userInfo: {},
      rules: {
        name: value => {
          const pattern = /^[가-힣]{2,4}$/;
          return pattern.test(value) || "잘못된 이름입니다."
        },
        phone: value => {
          const pattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
          return pattern.test(value) || "잘못된 핸드폰 번호 입력입니다."
        }
      },
      themeObj: {
        searchBgColor: "#0B65C8", //검색창 배경색
        queryTextColor: "#FFFFFF" //검색창 글자색
      }
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
            this.user = response.data.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateUserInfo() {
      axios.patch('/api/v1/users/profile', this.user, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => {
            var userInfo = new Object();
            console.log(res.data);
            userInfo.id = res.data.data.id;
            userInfo.name = res.data.data.name;
            userInfo.nickname = res.data.data.nickname;
            userInfo.address = res.data.data.address;
            userInfo.contact = res.data.data.contact;
            userInfo.role = res.data.data.role;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.alert("회원 정보가 수정되었습니다.");
            router.push('/');
          })
          .catch(error => {
            window.alert("회원 정보 수정 실패");
            console.error(error);
          });
    },
    openPostcode() {
      new window.daum.Postcode({
        width: 500,
        height: 600,
        theme: this.themeObj,
        oncomplete: (data) => {
          this.user.address = data.roadAddress;
        }
      }).open({
        left: (window.screen.width / 2) - (500 / 2),
        top: (window.screen.height / 2) - (600 / 2),
      });
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

.address-box {
  display: flex;
}

.address-btn {
  margin-top: 9px;
}

.submit-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>