<template>
  <div class="filter-group">
    <div class="text-center">
      <v-select v-model="location" :items="locations" label="test1"></v-select>
      <v-menu>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-center">
      <v-select v-model="location" :items="locations" label="test1"></v-select>
      <v-menu>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-center">
      <v-select v-model="location" :items="locations" label="test1"></v-select>
      <v-menu>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-center">
      <v-select v-model="location" :items="locations" label="test1"></v-select>
      <v-menu>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me 2'},
    ],
    locations: ['top', 'bottom', 'start', 'end', 'center'],
    location: 'end',
  }),
}

</script>

<style>
.filter-group{
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
}

</style>