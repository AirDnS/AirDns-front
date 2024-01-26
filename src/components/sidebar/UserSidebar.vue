<template>
  <div>
    <RouterLink to="/" style="text-decoration: none; color: inherit;">
      <div class="airdns-logo">
          <v-icon class="v-icon">mdi-desk</v-icon>
          <v-app-bar-title>airDnS</v-app-bar-title>
      </div>
    </RouterLink>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">
      <v-list class="pa-4" color="transparent">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in sidebarItem" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item :to="item.to" rounded="lg" class="mb-1" v-show="hasPerm(item.perm)">
            <v-list-item-avatar start class="v-list-item-avatar--start">
              <v-icon class="feather-sm v-icon v-icon--size-default">{{
                item.icon
              }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import sidebarItem from "./sidebarItem.json";

export default {
    data() {
        return {
          isHost: false,
          sidebarItem: sidebarItem
        };
    },
    mounted() {
      if (localStorage.getItem('accessToken') != null) {
        console.log(JSON.parse(localStorage.getItem('userInfo'))["role"]);
        if (JSON.parse(localStorage.getItem('userInfo'))["role"] === "HOST") {
          this.isHost = true;
        }
      }
    },
    methods: {
      hasPerm(perm) {
        if (perm == "all") {
          return true;
        } else if (perm == "host") {
          if (this.isHost == true) {
            return true;
          }
        }
        return false;
      }
    }

}
</script>
<style scoped>
  
.scrollnavbar .v-list--one-line .v-list-item--active {
    background: rgb(var(--v-theme-secondary));
    color: #fff !important;
}

</style>