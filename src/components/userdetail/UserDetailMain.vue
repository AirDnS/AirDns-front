<template>
  <div>
    <header class="user-info">
      <h1>회원 정보</h1>
    </header>
    <main>
      <div class="user-info">
        <label>이름:</label>
        <span>{{ user.name }}</span>
      </div>
      <div class="user-info">
        <label>이메일:</label>
        <span>{{ user.email }}</span>
      </div>
      <div class="user-info">
        <label>주소:</label>
        <span>{{ user.address }}</span>
      </div>
      <div class="user-info">
        <label>연락처:</label>
        <span>{{ user.contact }}</span>
      </div>
    </main>

    <footer>
      <button @click="goBack" class="bordered-button">뒤로 가기</button>
    </footer>
  </div>
</template>

<script>
import router from "@/routers";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        address: "",
        contact: ""
      },
    };
  },
  methods: {
    goBack() {
      // 메인 화면으로 이동
      router.push('/')
    },
  },
};
</script>

<style scoped>
.user-info {
  margin-bottom: 10px;
}
.bordered-button {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
