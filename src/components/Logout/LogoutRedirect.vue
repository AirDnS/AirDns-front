<template>
  <div>
  </div>
</template>

<script>

import router from "@/routers";

export default {
  created() {
    localStorage.removeItem("accessToken");
    if (this.$cookies.get("Authorization")) {
      this.$cookies.remove("Authorization");
    }
    window.alert('로그아웃에 성공했습니다')
    router.push({name: 'HomePage'})
  }
}
</script>