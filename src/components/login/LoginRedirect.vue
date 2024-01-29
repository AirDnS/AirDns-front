<template>
  <div></div>
</template>

<script>
import router from "@/routers";

export default {
  async created() {
    var status = this.$route.query.status;
    if (status === "Success") {
      if (this.$route.query.name === "Default" || this.$route.query.contact === "Default") {
        window.alert("서비스 이용을 위해 추가 정보 입력이 필요합니다.")
        await router.push({name: 'LoginDetailPage'})
      } else {
        window.alert("로그인에 성공했습니다.")
        var userInfo = new Object();
        userInfo.id = this.$route.query.userId;
        userInfo.nickname = decodeURI(this.$route.query.nickname);
        userInfo.address = decodeURI(this.$route.query.address);
        userInfo.contact = this.$route.query.contact;
        userInfo.role = this.$route.query.role;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        await router.push({name: 'HomePage'})
      }
    } else {
      window.alert('로그인에 실패했습니다.')
      await router.push({name: 'LoginPage'})
    }
  }
}
</script>
<style>
</style>