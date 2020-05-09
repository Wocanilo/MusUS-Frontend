<template>
  <div class="home">
    <div>
      <h1 class="text-center">Lastest posts</h1>
    </div>
    <!-- Trees separator -->
    <img src="@/assets/img/forest.jpg" class="img-fluid w-100" alt="MusUS logo" />
    <!-- Content -->
    <h3 class="text-center mt-3" v-if="cards.length == 0">No posts. Be the first!</h3>
    <Cards v-bind:cards="cards"></Cards>
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
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
  data(){
    return {
      cards: []
    }
  },
  mounted(){
    axios.get(this.config.apiBaseUrl + "getPosts.php").then(response => {
      if(response.data.status == 200){
        this.cards = response.data.data;
      }
    })
  }
};
</script>
