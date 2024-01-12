<template>
  <div class="detail-image-box">
    <div class="image-container">
      <div class="detail-image1">
      </div>
      <div class="detail-image2">
      </div>
      <div class="detail-image3">
      </div>
    </div>
  </div>

  <div class="detail-desc-box">
    <div class="desc-container">
      <v-sheet class="detail-desc1" :elevation="10" >
        <div>제목</div>
        <div>모니터 2개, 2023 맥북 프로</div>
      </v-sheet>
      <v-sheet class="detail-desc2" :elevation="10">
        <div>
          상세 설명
        </div>
      </v-sheet>
      <v-sheet class="detail-desc3" :elevation="10" >
        <RoomReservation>
        </RoomReservation>
      </v-sheet>
      <v-sheet class="detail-desc4" :elevation="10">
        <RoomLike></RoomLike>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import RoomReservation from "@/components/roomdetail/RoomReservation.vue";
import RoomLike from "@/components/roomdetail/RoomLike.vue";

export default {
  components : {
    'RoomReservation' : RoomReservation,
    'RoomLike' : RoomLike
  }
}
</script>

<style>
.detail-image-box {
  margin: auto;
  display: flex;
  justify-content: center;
}

.image-container {
  width: 800px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 150px);
  gap: 15px;
  margin-top: 20px;
}

.detail-image1 {
  background-color: #3689ff;
  grid-column: 1/2;
  grid-row: 1 / 3;
}

.detail-image2 {
  background-color: #00cf12;
  grid-column: 2/3;
  grid-row: 1/2;
}

.detail-image3 {
  background-color: #ffd000;
  grid-column: 2/3;
  grid-row: 2/3;
}

.detail-desc-box {
  margin: auto;
  display: flex;
  justify-content: center;
}

.desc-container {
  width:800px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 15px;
  margin-top: 20px;
}

.detail-desc1 {
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;;
  flex-direction: column;
  text-align: center;
}

.detail-desc2 {
  grid-column: 1/2;
  grid-row: 2/4;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.detail-desc3 {
  grid-column: 2/3;
  grid-row: 1/3;
}

.detail-desc4 {
  grid-column: 2/3;
  grid-row: 3/4;
  display: flex;
}

</style>