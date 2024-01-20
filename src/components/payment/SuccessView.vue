<template>
  <div>
    <p>paymentKey = {{ this.$route.query.paymentKey }}</p>
    <p>orderId = {{ this.$route.query.orderId }}</p>
    <p>amount = {{ this.$route.query.amount }}</p>
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
