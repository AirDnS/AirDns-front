<template>
  <div class="wrapper">
    <div class="box_section">
      <!-- 결제 UI -->
      <div id="payment-method"></div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 쿠폰 체크박스 -->
      <div style="padding-left: 25px">
        <div class="checkable typography--p">
          <label for="coupon-box" class="checkable__label typography--regular"
          ><input @change="updateAmount" id="coupon-box" class="checkable__input" type="checkbox" aria-checked="true" /><span class="checkable__label-text">5,000원 쿠폰 적용</span></label
          >
        </div>
      </div>
      <!-- 결제하기 버튼 -->
      <div class="result wrapper">
        <div class="result-wrapper">
          <button @click="requestPayment" class="button" id="payment-button" style="margin-top: 30px">결제하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      data: null,
      paymentWidget: null,
      paymentMethodWidget: null,
      clientKey: "test_ck_Ba5PzR0ArnWdaxZloyQ18vmYnNeD",
      customerKey: nanoid(),
      amount: 5000,
    };
  },
  methods: {
    async requestPayment() {
      try {
        if (this.paymentWidget){
          await this.paymentWidget.requestPayment({
            orderId: nanoid(),
            orderName: this.data.reservationName,
            customerName: this.data.userName,
            customerEmail: this.data.userEmail,
            customerMobilePhone: this.data.userContact,
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateAmount() {
      const coupon = document.getElementById("coupon-box");
      if (coupon.checked) {
        this.paymentMethodWidget.updateAmount(this.amount - 5000);
      } else {
        this.paymentMethodWidget.updateAmount(this.amount);
      }
    },
  },
  async mounted() {
    this.paymentWidget = await loadPaymentWidget(this.clientKey, ANONYMOUS);

    this.paymentMethodWidget = this.paymentWidget.renderPaymentMethods("#payment-method", { value: this.amount }, { variantKey: "DEFAULT" });
    this.paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
  },
  created() {
    const {data} = history.state;
    this.data = data;
    this.amount = this.data.price
  }
};
</script>
<style>
.result-wrapper{
  width: 100px;
  margin-left: 10px;
  color: blue;
}
</style>