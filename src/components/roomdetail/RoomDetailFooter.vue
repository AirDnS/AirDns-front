<template>
  <v-sheet class = "review-list" :elevation="10" >
    <v-btn elevation="10" width="1200px" color="red white--text">리뷰 추가</v-btn>
    <v-card>
      <v-list variant="outlined"
              class="review-item"
              elevation="10" :items="items"></v-list>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: '리뷰1',
        value: 1,
      },
      {
        title: '리뷰2',
        value: 2,
      },
      {
        title: '리뷰3',
        value: 3,
      },
    ],
  }),
}
</script>
<style>
.review-list {
  margin-top: 30px;
  text-align: center;
  width: 1200px;
}

</style>