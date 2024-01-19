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
    <p class="mb-3 text-right text-body-2 text-grey-darken-1" v-if="price">시간당 가격 : {{ price }} ₩</p>
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
      price: null
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
    }
  }
}
</script>
<style>
.reservation-form {
  margin: 8px;
}

</style>