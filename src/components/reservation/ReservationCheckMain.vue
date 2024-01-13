<template>
  <div class="reservation-checking-box">
    <div class="reservation-checking-container">
      <div class="reservation-checking1">
        <h1>확인 및 결제</h1>
      </div>
      <div class="reservation-checking2">
        <h2>예약 정보</h2>
      </div>
      <div class="reservation-checking3">
        <h3>날짜</h3>
        <h3>2023.10.20 10시 30분 ~ 2023.10.20 12시 30분</h3>
      </div>
      <div class="reservation-checking4">
        <h3>인원</h3>
        <h3>3명</h3>
      </div>
      <div class="reservation-checking5">
      </div>
    </div>
    <div class="reservation-confirm">
      <v-btn color="#1f4ef5" type="submit" block class="mt-2" v-on:click="goPaymentChecking">결제하기</v-btn>
    </div>
  </div>
</template>
<script>
import router from "@/routers";
export default {
  methods: {
    goReservationChecking() {
      router.push('reservation')
    }
  }

};


</script>
<style>
.reservation-checking-box {
  margin: auto;
  display: flex;
  justify-content: center;
}

.reservation-checking-container {
  width: 800px;
  display: grid;
  border:1px solid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 100px);
  gap: 15px;
  margin-top: 20px;

}

.reservation-checking1 {
  background-color: #3689ff;
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reservation-checking2 {
  background-color: #00cf12;
  grid-column: 1/2;
  grid-row: 2/3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reservation-checking3 {
  background-color: #ffd000;
  grid-column: 1/2;
  grid-row: 3/4;
  text-align: center;
}

.reservation-checking4 {
  background-color: #ffd000;
  grid-column: 1/2;
  grid-row: 4/5;
  text-align: center;
}

.reservation-checking5 {
  background-color: #ffd000;
  grid-column: 2/3;
  grid-row: 1/5;
}
.reservation-confirm {
  position: absolute;
  bottom: 35%;
}


</style>