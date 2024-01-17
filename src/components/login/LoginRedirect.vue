<template>
  <div>
    test
  </div>
</template>

<script>

import router from "@/routers";

export default {
  created() {
    const token = this.$route.query.token;

    if(token){
      localStorage.setItem("accessToken", token);
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