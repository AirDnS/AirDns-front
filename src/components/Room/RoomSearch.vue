<template>
  <v-card class="search-card">
    <!-- 검색창과 아이콘 -->
    <v-text-field class = "search_input">
    </v-text-field>
    <v-btn variant="outlined" class="search-btn"> 검색
    </v-btn>
    <!-- 여기에 내용 추가 가능 -->
  </v-card>
</template>
<script>
export default {}
</script>

<style>
.search-card {
  display: flex;
  height: 100px;
}
.search_input {
  width: 400px;
  height: 80px;
  margin-top: 20px;
  margin-left: 20px;
}
.search-btn {
  margin: 32px;
}
</style>