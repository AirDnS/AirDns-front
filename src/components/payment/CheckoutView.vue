<template>
  <div class="wrapper">
    <div class="box_section">
      <!-- 결제 UI -->
      <div id="payment-method"></div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 결제하기 버튼 -->
      <div class="result-wrapper">
        <button @click="requestPayment" class="button" id="payment-button" style="margin-top: 30px">
          결제하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {loadPaymentWidget, ANONYMOUS} from "@tosspayments/payment-widget-sdk";
import {nanoid} from "nanoid";

export default {
  data() {
    return {
      data: null,
      paymentWidget: null,
      paymentMethodWidget: null,
      clientKey: "test_ck_Ba5PzR0ArnWdaxZloyQ18vmYnNeD",
      customerKey: nanoid(),
      amount: null,
    };
  },
  methods: {
    async requestPayment() {
      try {
        if (this.paymentWidget) {
          var regex = /[^0-9]/g;
          var result = this.data.userContact.replace(regex, "");
          await this.paymentWidget.requestPayment({
            orderId: nanoid(),
            orderName: this.data.reservationName,
            customerName: this.data.userName,
            customerEmail: this.data.userEmail,
            reservationId: this.data.id,
            customerMobilePhone: result,
            successUrl: `${window.location.origin}/success?orderName=${encodeURIComponent(
                this.data.reservationName)}&reservationId=${this.data.id}`,
            failUrl: `${window.location.origin}/fail`,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    this.paymentWidget = await loadPaymentWidget(this.clientKey, ANONYMOUS);
    this.paymentMethodWidget = this.paymentWidget.renderPaymentMethods("#payment-method",
        {value: this.amount}, {variantKey: "DEFAULT"});
    this.paymentWidget.renderAgreement("#agreement", {variantKey: "AGREEMENT"});
  },
  created() {
    const {data} = history.state;
    this.data = data;
    this.amount = this.data.price
  }
};
</script>
<style>
.box_section {
  width: 650px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 1%), 0 6px 6px rgb(0 0 0 / 6%);
  padding: 40px 30px 50px 30px;
  margin: auto;
  margin-top: 100px;
  color: #333D4B;
}
.button{
  color: #f9fafb;
  background-color: #3182f6;
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  border: 0 solid transparent;
  user-select: none;
  transition: background 0.2s ease, color 0.1s ease;
  text-decoration: none;
  border-radius: 7px;
  padding: 10px 13px;
}

.result-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>