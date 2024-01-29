<template>
  <v-sheet rounded class="detail-sheet">
    <v-card max-width="700">
      <v-card-title>
        추가 정보 입력
      </v-card-title>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
            v-model="name"
            :rules="[rules.required,rules.name]"
            label="Name"
            placeholder="홍길동"
            required
        ></v-text-field>
        <v-text-field
            v-model="nickname"
            :rules="[rules.required]"
            label="닉네임"
            placeholder="양배추"
            required
        ></v-text-field>
        <v-text-field
            v-model="phoneNumber"
            :rules="[rules.required, rules.phone]"
            label="Phone Number"
            placeholder="010-1234-1234"
            required
            maxlength="13"
        ></v-text-field>
        <div class="postcodeBox">
          <v-text-field type="text" v-model="roadAddress" placeholder="주소" readonly></v-text-field>
          <v-btn class="post-btn" id="postcode" @click="openPostcode">검색
          </v-btn>
        </div>
        <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
        >
          submit
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from "@/axios";
import router from "@/routers";

export default {
  data() {
    return {
      name: "",
      phoneNumber: "",
      nickname: "",
      loading: false,
      form: false,
      dialog: false,
      roadAddress: "",
      themeObj: {
        searchBgColor: "#0B65C8", //검색창 배경색
        queryTextColor: "#FFFFFF" //검색창 글자색
      },
      rules: {
        required: value => !!value || "입력해야 합니다!!",
        name: value => {
          const pattern = /^[가-힣]{2,4}$/;
          return pattern.test(value) || "잘못된 이름입니다."
        },
        phone: value => {
          const pattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
          return pattern.test(value) || "잘못된 핸드폰 번호 입력입니다."
        }
      },
      requestData: {
        name: "",
        nickname: "",
        contact: "",
        address: ""
      }
    }
  },

  methods: {
    openPostcode() {
      new window.daum.Postcode({
        width: 500,
        height: 600,
        theme: this.themeObj,
        oncomplete: (data) => {
          this.roadAddress = data.roadAddress;
        }
      }).open({
        left: (window.screen.width / 2) - (500 / 2),
        top: (window.screen.height / 2) - (600 / 2),
      });
    },
    onSubmit() {
      if (!this.form) return
      this.loading = true
      this.requestData.name = this.name;
      this.requestData.nickname = this.nickname;
      this.requestData.contact = this.phoneNumber;
      this.requestData.address = this.roadAddress;
      axios.patch(`/api/v1/users/profile`, this.requestData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        var userInfo = new Object();
        console.log(res.data);
        userInfo.id = res.data.data.id;
        userInfo.name = res.data.data.name;
        userInfo.nickname = res.data.data.nickname;
        userInfo.address = res.data.data.address;
        userInfo.contact = res.data.data.contact;
        userInfo.role = res.data.data.role;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.loading = false
        window.alert("로그인에 성공했습니다.")
        router.push({name:'HomePage'})
      }).catch(() =>{
        this.loading = false
        window.alert("로그인에 실패했습니다.")
        router.push({name: 'LoginPage'})
      })
    }
  },
}
</script>
<style>
.detail-sheet {
  display: flex;
  justify-content: center;
  align-items: center;
}

.postcodeBox {
  display: flex;
}

.post-btn {
  margin-top: 10px;
}
</style>