<template>
  <v-row class="review-list ma-3 mt-8" :elevation="10">    

    <v-card
      class="ma-4 mx-8"
      rounded="lg"
      variant="flat"
    >
    <v-divider></v-divider>
      <v-card-item v-for="data in reviewData" :key="data.reviewsId">

        <div class="py-2">
          <div class="text-h6">{{ data.nickName }} <span class="text-caption ml-1">{{ data.createdAt }}</span> </div>

          <div class="font-weight-light text-medium-emphasis">
            {{data.content}}
          </div>
        </div>
        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-delete"
            variant="text"
            @click="deleteReview"
            :data-id="data.reviewsId"
          ></v-btn>
        </template>
      </v-card-item>
      
    </v-card>
    
    <v-row
      class="mx-3">
      <v-textarea 
      label="후기"
      v-model=reviewContent
      clearable
      auto-grow
      rows="1"
      prepend-icon="mdi-comment"
      variant="outlined">
    </v-textarea>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="setReview"
        :disabled="!reviewContent.trim()"
        :loading="isLoading"
        color="deep-purple-accent-4">
        작성하기
      </v-btn>
    </v-card-actions>
    </v-row>
  </v-row>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      roomsId: "null",
      reviewData: [],
      reviewContent: "",
      isValid: false,
      isLoading: false,
      accessToken: null,
    }
  },
  methods: {
    getReview: function () {
      console.log(this.roomsId)
      axios.get(`http://localhost:8080/api/v1/rooms/${this.roomsId}/review`)
          .then((result) => {
            this.reviewData = result.data.data;
            console.log(this.reviewData);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          })
    },
    setReview: function () {
      let params = {
        content: this.reviewContent
      }

      axios.post(`http://localhost:8080/api/v1/rooms/${this.roomsId}/review`, params)
          .then((result) => {
            console.log( result.data.data );
            this.reviewContent = "";
            this.getReview();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          })
    },
    deleteReview: function (e) {
      let reviewsId = e.currentTarget.dataset.id;
      console.log( reviewsId );
      axios.delete(`http://localhost:8080/api/v1/rooms/${this.roomsId}/review/${reviewsId}`)
            .then((result) => {
              console.log( result.data.message );
              this.getReview();
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
            })
    },
  },
  created() {
    const {data} = history.state;
    this.roomsId = data;
    this.getReview();
  }
}
</script>
<style>

</style>