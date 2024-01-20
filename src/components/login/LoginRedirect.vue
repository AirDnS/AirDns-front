<template>
  <div>
    test
  </div>
</template>

<script>

import router from "@/routers";
import axios from "axios";

export default {
  created() {
    const token = this.$route.query.token;

    if(token){
      localStorage.setItem("accessToken", token);
      axios.get('http://localhost:8080/api/v1/users' ,
          {
            headers: {
              "Authorization": localStorage.getItem('accessToken')
            }})
          .then((res) => {
            console.log(res.data.data)
            localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          })
          .catch((error) => {
            window.alert(error)
          })
          .finally(() => {
            console.log("getUserInfo")
      })
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