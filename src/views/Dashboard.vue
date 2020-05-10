<template>
  <div class="dashboard">
    <header>
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <h1 class="text-center">Dashboard</h1>
          </div>
        </div>
        <!-- Search -->
        <div class="row d-md-block d-none">
          <div class="col">
            <form>
              <div class="form-group">
                <div class="input-group">
                  <!-- Input with radio buttons -->
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <font-awesome-icon icon="search"></font-awesome-icon>
                    </div>
                  </div>
                  <b-input type="text" id="search" placeholder="Search" v-model="search" ></b-input>
                  <b-input-group-prepend>
                    <b-form-radio-group
                      id="btn-radios-1"
                      v-model="searchType"
                      :options="options"
                      buttons
                      v-on:change="searchRadioChange"
                      button-variant="info"
                    ></b-form-radio-group>
                  </b-input-group-prepend>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Small screns -->
      <div class="row d-md-none">
        <div class="col">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <font-awesome-icon icon="search"></font-awesome-icon>
              </div>
            </div>

            <input type="text" class="form-control" id="search" placeholder="Search" />
          </div>
        </div>
      </div>

      <div class="row d-md-none">
        <div class="col">
          <div class="btn-group btn-group-toggle input-group-append" data-toggle="buttons">
            <label class="btn btn-primary active">
              <input type="radio" name="searchType" id="following" autocomplete="off" checked />Following
            </label>
            <label class="btn btn-primary">
              <input type="radio" name="searchType" id="trending" autocomplete="off" />Trending
            </label>
            <label class="btn btn-primary">
              <input type="radio" name="searchType" id="tag" autocomplete="off" />Tag
            </label>
            <label class="btn btn-primary">
              <input type="radio" name="searchType" id="User" autocomplete="off" />User
            </label>
          </div>
        </div>
      </div>

    <h3 class="text-center mt-3" v-if="cards.length == 0">No posts.</h3>
    <Cards v-bind:cards="cards"></Cards>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Cards from "@/components/Cards.vue";

export default {
  name: "Dashboard",
  components: {
    Cards
  },
  computed: mapState({
    config: state => state.config
  }),
  data() {
    return {
      searchType: "all",
      search: "",
      cards: [],
      options: [
          { text: 'All', value: 'all' },
          { text: 'Following', value: 'following' },
          { text: 'Trending', value: 'trending' },
          { text: 'Tag', value: 'tag' },
          { text: 'User', value: 'user' }
        ]
    };
  },
  mounted() {},
  methods: {
    searchRadioChange(value){
      if(value == "following"){
          axios({
            method: "GET",
            url: this.config.apiBaseUrl + "getPosts.php",
            withCredentials: true,
            params: {
              action: "followingPosts",
              search: this.search
            }
          })
            .then(response => {
              if (response.data.status == 200) {
                this.cards = response.data.data;
              }
            })
            .then(error => {
              this.error = error;
            });
      }
    }
  }
};
</script>
