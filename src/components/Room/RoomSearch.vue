<template>
  <div class="search-field">
  <v-card class="search-card">
    <!-- 검색창과 아이콘 -->
    <v-text-field class="search_input">
    </v-text-field>
    <v-btn variant="outlined" class="search-btn"> 검색
    </v-btn>
  </v-card>
  </div>
</template>
<script>
export default {
}
</script>

<style>
.search-field {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search-card {
  display: flex;
  height: 70px;
  width: 800px;
  margin-bottom: 10px;
}

.search_input {
  width: 400px;
  margin-top: 8px;
  margin-left: 20px;
}

.search-btn {
  margin: 18px;
}
</style>