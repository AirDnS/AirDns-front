<template>
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
</template>
<script>
export default {}
</script>

<style>
.like-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 110px;
}
.hate-button {
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>
