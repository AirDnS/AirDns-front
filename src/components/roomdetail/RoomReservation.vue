<template>
    <CustomDatePicker 
      :reservatedTimeList="this.reservatedTimeList"
      @select="selectReservationDate"
    ></CustomDatePicker>
    <v-btn color="error" type="submit" block class="mt-2" v-on:click="goReservationChecking">예약하기</v-btn>
    <v-row>
      <v-col>
        <v-btn icon="mdi mdi-help-circle-outline" variant="plain" size="x-small" @click="showReservatedList" v-if="reservatedTimeList.length > 0"></v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <p class="mb-3 text-no-wrap text-right text-body-2 text-grey-darken-1" v-if="price">시간당 가격 : {{ price }} ₩</p>
      </v-col>
    </v-row>
  </template>

<script>
import router from "@/routers";
import CustomDatePicker from "@/components/unit/CustomDatePicker.vue"

export default {
  components: {
    CustomDatePicker
  },
  data() {
    return {
      roomsId: null,
      roomsName: null,
      // checkInTime: null,
      // checkOutTime: null,
      price: null,
      reservatedTimeList: [],
      reservationParams: {}
    }
  },
  mounted() {
    this.emitter.on("roomsId", (data) => {
      this.roomsId = data;
      console.log(this.roomsId);
    });
    
    this.emitter.on("roomsName", (data) => {
      this.roomsName = data;
      console.log(this.roomsId);
    });
    
    this.emitter.on("price", (data) => {
      this.price = data;
      console.log(this.price);
    });
    
    this.emitter.on("reservatedTimeList", (data) => {
      this.reservatedTimeList = data;
    });

  },
  methods: {
    selectReservationDate(data) {
      this.reservationParams = data;
    },
    goReservationChecking() {
      
      this.$swal.fire({
        title: this.roomsName + " 예약",
        html: "<div class='reservation-info-text-wrapper'><div class='reservation-info-text'>"
          + "체크인ㅤㅤ" + this.reservationParams.startDate 
          + "<br>체크아웃ㅤ" + this.reservationParams.endDate
          + "<br>총ㅤ금액ㅤ" 
          + (this.price * this.getDifferenceBetweenDate(
            this.reservationParams.startDate , this.reservationParams.endDate
            ))
          + " ₩ </div></div>",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "예약하기",
        cancelButtonText: "취소"
      }).then((swalResult) => {
        if (swalResult.isConfirmed) {
          const map = {
            roomsId: this.roomsId,
            checkInTime: this.checkInTime,
            checkOutTime: this.checkInTime
          };

          router.push({
            name: 'ReservationChecking',
            state: map
          });
        }
      });
    },
    showReservatedList() {
      this.$swal.fire({
        title: "해당 시간에는<br> 예약이 불가능합니다!",
        html: this.reservatedTimeList.join("<br>").replaceAll(",", " ~ "),
        icon: "infomation"
      });
    },

    getDifferenceBetweenDate(date1, date2) {
      return (new Date(date2) - new Date(date1))/(1000*60*60);
    }
  }
}
</script>
<style>
.reservation-info-text-wrapper {
  display: flex;
  justify-content: center;
}
.reservation-info-text {
  text-align: left;
}
</style>