<template>
  <div class="payment-info">
    <div class="message">
      PAYMENT COMPLETED!
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      requestData: {
        orderName: "",
        paymentKey: "",
        orderId: "",
        amount: "",
        paymentType: "",
        reservationId: "",
      },
    };
  },
  methods: {
    confirmPayment() {
      this.requestData.orderName = this.$route.query.orderName;
      this.requestData.paymentKey = this.$route.query.paymentKey;
      this.requestData.orderId = this.$route.query.orderId;
      this.requestData.amount = this.$route.query.amount;
      this.requestData.paymentType = this.$route.query.paymentType;
      this.requestData.reservationId = this.$route.query.reservationId;

      axios
      .post(
          // eslint-disable-next-line no-undef
          `/api/v1/reservation/${this.$route.query.reservationId}/payment`,
          this.requestData,
          {
            withCredentials:true,
            headers: {
              "Content-Type": "application/json",
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
  width: 650px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 1%), 0 6px 6px rgb(0 0 0 / 6%);
  padding: 40px 30px 50px 30px;
  margin: auto;
  margin-top: 100px;
  color: #333D4B;
}

</style>