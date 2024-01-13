<template>
  <v-form fast-fail @submit.prevent class="reservation-form">
    <v-text-field
        label="CheckInTime"></v-text-field>
    <v-text-field
        label="checkOutTime"
    ></v-text-field>
    <v-btn color="error" type="submit" block class="mt-2" v-on:click="goReservationChecking">예약하기</v-btn>
  </v-form>
</template>

<script>
import router from "@/routers";

export default {
  methods: {
    goReservationChecking() {
      router.push('reservation')
    }
  }
}
</script>
<style>
.reservation-form {
  margin: 8px;
}

</style>