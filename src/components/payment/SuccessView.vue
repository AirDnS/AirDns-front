<template>
  <div class="payment-info">
    <h2> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; PAYMENT COMPLETED</h2>
    <p>PAYMENT KEY = {{ this.$route.query.paymentKey }}<br/></p>
    <p>RESERVATION ID = {{ this.$route.query.orderId }}<br/></p>
    <p>결제 금액 = {{ this.$route.query.amount }}</p>
  </div>
  <div class="info-check">
    <v-btn
        color="#ffffff"
        type="submit"
        block
        class="mt-2"
        v-on:click="b"
    >다른 예약 진행하기</v-btn>
    <v-btn
        color="#696969"
        type="submit"
        block
        class="mt-2"
        v-on:click="c"
    >예약 상세 정보</v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requestData: {
        paymentKey: "",
        orderId: "",
        amount: "",
      },
    };
  },
  methods: {
    confirmPayment() {
      this.requestData.paymentKey = this.$route.query.paymentKey;
      this.requestData.orderId = this.$route.query.orderId;
      this.requestData.amount = this.$route.query.amount;

      axios
      .post(
          `http://localhost:8080/api/v1/payments/confirm`,
          this.requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("accessToken"),
            },
          }
      )
      .then((res) => {
        console.log("API Response:", res.data);
      })
      .catch((error) => {
        console.log("API Error:", error);
      })
      .finally(() => {
        console.log("API Call completed");
      });
    },
  },
  mounted() {
    console.log("Initial requestData:", this.requestData);
    this.confirmPayment();
  },
};
</script>

<style>
.payment-info {
  padding: 10px 10px 10px 10px;
  width: 500px;
  margin-left: 20px;
  display: block;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #696969;
  flex-direction: column;
}

.info-check{
  margin-top: 20px;
  margin-left: 90px;
  bottom: 28%;
  width: 350px;
}
</style>
