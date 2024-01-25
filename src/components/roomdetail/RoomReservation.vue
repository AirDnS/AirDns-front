<template>
  <v-form fast-fail @submit.prevent class="reservation-form">
    <v-text-field 
      v-model="checkInTime"
      label="CheckInTime">
    </v-text-field>
    <v-text-field 
      v-model="checkOutTime"
      label="checkOutTime">
    </v-text-field>
    <v-row>
      <v-col>
        <v-btn icon="mdi mdi-help-circle-outline" variant="plain" size="x-small" @click="showReservatedList" v-if="reservatedTimeList.length > 0"></v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <p class="mb-3 text-no-wrap text-right text-body-2 text-grey-darken-1" v-if="price">시간당 가격 : {{ price }} ₩</p>
      </v-col>
    </v-row>
    <v-btn color="error" type="submit" block class="mt-2" v-on:click="goReservationChecking">예약하기</v-btn>
  </v-form>
</template>

<script>
import router from "@/routers";

export default {
  data() {
    return {
      roomsId: null,
      checkInTime: null,
      checkOutTime: null,
      price: null,
      reservatedTimeList: [],
    }

  },
  mounted() {
    this.emitter.on("roomsId", (data) => {
      this.roomsId = data;
      console.log(this.roomsId);
    });
    
    this.emitter.on("price", (data) => {
      this.price = data;
      console.log(this.price);
    });
    
    this.emitter.on("reservatedTimeList", (data) => {
      this.reservatedTimeList = data;
      console.log(this.reservatedTimeList);
    });

  },
  methods: {
    goReservationChecking() {
      const map = {
        roomsId: this.roomsId,
        checkInTime: this.checkInTime,
        checkOutTime: this.checkInTime
      };

      router.push({
        name: 'ReservationChecking',
        state: map
      });
    },
    showReservatedList() {
      this.$swal.fire({
        title: "해당 시간에는<br> 예약이 불가능합니다!",
        html: this.reservatedTimeList.join("<br>").replaceAll(",", " ~ "),
        icon: "infomation"
      });
    }
  }
}
</script>
<style>
.reservation-form {
  margin: 8px;
}

</style>