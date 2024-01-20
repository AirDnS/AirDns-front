<template>
  <div class="like-container">
    <div class="like-button">
      <v-btn
          class="ma-2"
          variant="text"
          icon="mdi-thumb-up"
          color="blue-lighten-2"
      ></v-btn>
      <div>1</div>
    </div>
    <div class="hate-button">
      <v-btn
          class="ma-2"
          variant="text"
          icon="mdi-thumb-down"
          color="red-lighten-2"
      ></v-btn>
      <div>2</div>
    </div>

  </div>
</template>
<script>
export default {}
</script>

<style>
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

.like-button > button {
  padding-right: 15px;
}

.hate-button {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.hate-button > button {
  padding-right: 15px;
}

</style>
