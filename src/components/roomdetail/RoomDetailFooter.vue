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

          <div class="font-weight-light text-medium-emphasis" style="white-space: pre-line" v-if="modReviewsId != data.reviewsId">
            {{data.content}}
          </div>
          <v-textarea
            class="pa-0"
            v-if="modReviewsId == data.reviewsId"
            v-model="modReviewContent"
            variant="underlined"
            rows="1"
            auto-grow
            hide-details="true"
          >
          <!-- {{ data.content }} -->
          </v-textarea>
        </div>
        
        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-pencil"
            variant="text"
            @click="modReviewButton"
            :data-id="data.reviewsId"
            :data-content="data.content"
          ></v-btn>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-delete"
            variant="text"
            @click="deleteReviewButton"
            :data-id="data.reviewsId"
          ></v-btn>
        </template>
      </v-card-item>
      
    </v-card>
    
    <v-row
      class="mx-3">
      <v-textarea 
      label="후기"
      v-model=addReviewContent
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
        :disabled="!addReviewContent.trim()"
        color="deep-purple-accent-4">
        작성하기
      </v-btn>
    </v-card-actions>
    </v-row>
  </v-row>



<!-- Dialog -->
  <v-dialog
    v-model="delDialog"
    persistent
    width="auto"
  >
    <v-card>
      <v-card-title class="text-h5 pa-10">
        리뷰를 삭제하시겠습니까?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="delDialog = false"
        >
          아니오
        </v-btn>
        <v-btn
          color="red-darken-1"
          variant="text"
          @click="deleteReview"
        >
          네
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>


<script>
import axios from "@/axios";

export default {
  data() {
    return {
      roomsId: "null",
      reviewData: [],
      addReviewContent: "",
      modReviewsId: null,
      modReviewContent: "",
      delReviewsId: null,
      delDialog: false,
    }
  },
  methods: {
    getReview: function () {
      console.log(this.roomsId)
      axios.get(`/api/v1/rooms/${this.roomsId}/review`)
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
        content: this.addReviewContent
      }

      axios.post(`/api/v1/rooms/${this.roomsId}/review`, params, this.authHeader())
          .then((result) => {
            console.log( result.data.data );
            this.addReviewContent = "";
            this.getReview();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          })
    },
    modReviewButton: function (e) {
      if (this.modReviewsId != null && this.modReviewsId == e.currentTarget.dataset.id) {
        this.modReview();
        this.modReviewsId = null;
        this.modReviewContent = null;
      } else {
        this.modReviewsId = e.currentTarget.dataset.id;
        this.modReviewContent = e.currentTarget.dataset.content;
      }
      
      
    },
    modReview: function () {
      let params = {
        content: this.modReviewContent
      }

      let reviewsId = this.modReviewsId;

      axios.patch(`/api/v1/rooms/${this.roomsId}/review/${reviewsId}`, params, this.authHeader())
          .then(() => {
            this.getReview();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          })
    },
    deleteReviewButton: function (e) {
      this.delDialog = true;
      this.delReviewsId = e.currentTarget.dataset.id;
    },
    deleteReview: function () {
      this.delDialog = false;
      axios.delete(`/api/v1/rooms/${this.roomsId}/review/${this.delReviewsId}`, this.authHeader())
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