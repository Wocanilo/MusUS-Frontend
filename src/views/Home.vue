<template>
  <div class="home">
    <div>
      <h1 class="text-center">Lastest posts</h1>
    </div>
    <!-- Trees separator -->
    <img src="@/assets/img/forest.jpg" class="img-fluid w-100" alt="MusUS logo" />
    <!-- Content -->
    <Cards></Cards>
  </div>
</template>

<script>
import Cards from "@/views/Cards.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Cards
  },
    computed: mapState({
    config: state => state.config,
    cards: state => state.cards
  }),
  mounted(){
    axios.get(this.config.apiBaseUrl + "getPosts.php").then(response => {
      if(response.data.status == 200){
        this.$store.commit("changeCards", response.data.data);
      }
    })
  }
};
</script>
