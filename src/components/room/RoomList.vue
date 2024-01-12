<template>
  <v-container class="room_list">
    <!-- 카드 UI 사용을 선언하는 v-card 엘리먼트 -->
    <v-card class="room_card">
      <!-- 카드 상단에 이미지 배치 -->
      <v-img src="src/assets/temp_room_img.png" aspect-ritio="2"></v-img>

      <!-- 카드 중간에 텍스트 배치 -->
      <v-card-text>
        <div>
          <h2 class="title primary--text mb-2">카드 UI</h2>
          <p class="mb-0">카드 디자인에 출력될 텍스트를 입력합니다.</p>
        </div>
      </v-card-text>
      <!-- 카드 하단에 버튼 배치 -->
      <v-card-actions>
        <v-btn width="300px" variant="outlined" color="red white--text" v-on:click="goDetail">상세 정보 확인</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="room_card">
      <!-- 카드 상단에 이미지 배치 -->
      <v-img src="src/assets/temp_room_img.png" aspect-ritio="2"></v-img>

      <!-- 카드 중간에 텍스트 배치 -->
      <v-card-text>
        <div>
          <h2 class="title primary--text mb-2">카드 UI</h2>
          <p class="mb-0">카드 디자인에 출력될 텍스트를 입력합니다.</p>
        </div>
      </v-card-text>
      <!-- 카드 하단에 버튼 배치 -->
      <v-card-actions>
        <v-btn width="300px" variant="outlined" color="red white--text">상세 정보 확인</v-btn>
      </v-card-actions>
    </v-card>


    <v-card class="room_card">
      <!-- 카드 상단에 이미지 배치 -->
      <v-img src="src/assets/temp_room_img.png" aspect-ritio="2"></v-img>

      <!-- 카드 중간에 텍스트 배치 -->
      <v-card-text>
        <div>
          <h2 class="title primary--text mb-2">카드 UI</h2>
          <p class="mb-0">카드 디자인에 출력될 텍스트를 입력합니다.</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn width="300px" variant="outlined" color="red white--text">상세 정보 확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/routers";

export default {
  methods: {
    goDetail() {
      router.push('detail')
    }
  }
}
</script>

<style>
.room_list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 250px 250px;
  gap: 15px;
}
</style>
<script setup>
</script>