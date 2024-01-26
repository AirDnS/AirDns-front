<template>
  <div>
    test
  </div>
</template>

<script>

import router from "@/routers";

export default {
  async created() {
    var status = this.$route.query.status;
    if(status === "Success"){
      var userInfo = new Object();
      userInfo.id = this.$route.query.userId;
      userInfo.nickname = decodeURI(this.$route.query.nickname);
      userInfo.address = decodeURI(this.$route.query.address);
      userInfo.contact = this.$route.query.contact;
      userInfo.role = this.$route.query.role;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      window.alert('로그인에 성공했습니다')
      router.push({name : 'HomePage'})
    }
    else {
      window.alert('로그인에 실패했습니다')
      router.push({name : 'LoginPage'})
    }
  }
}
</script>