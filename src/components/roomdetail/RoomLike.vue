<template>
  <div class="like-container">
    <div class="like-button">
      <v-btn
          class="ma-2"
          variant="text"
          icon="mdi-thumb-up"
          color="blue-lighten-2"
          v-on:click="createLike"
      ></v-btn>
      <div>{{ likes }}</div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";

export default {
  data() {
    return {
      likes: "",
      params: {}
    }
  },
  props: ["childVaule"],
  methods: {
    createLike: function () {
      axios.post(`/api/v1/rooms/${this.childVaule}/likes`, this.params, {withCredentials: true})
          .then(() => {
          })
          .catch((err) => {
                console.log(err)
                window.alert("이미 좋아요를 했습니다")
              }
          )
          .finally(() => {
            this.readLike()
          })
    },
    readLike: function () {
      axios.get(`/api/v1/rooms/${this.childVaule}/likes`)
          .then((res) => {
            this.likes = res.data.data.likeCount;
          })
          .catch((err) => {
            console.log(err)
          })
    }
  },

  created() {
    this.readLike()
  },

  watch: {
    likes: function (data) {
      this.likes = data;
    }
  }
}

</script>

<style scoped>
.like-container {
  display: flex;
  justify-content: space-around;
  padding: 0px 80px;
}

.like-button {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.hate-button {
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>
