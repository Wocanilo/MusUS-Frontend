<template>
  <div class="dashboard">
    <header>
      <div class="container">
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
                  <b-input
                    type="text"
                    id="search"
                    :placeholder="
                      searchType == 'tagsPosts'
                        ? 'Search by tag'
                        : 'Search by title'
                    "
                    v-model="search"
                    @keyup="searchPostTimer"
                    :disabled="searchType == 'trendingUsers'"
                  ></b-input>
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

        <!-- Small screns -->
        <div class="row d-md-none">
          <div class="col">
            <div class="input-group mb-2 ml-1 mr-1">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <font-awesome-icon icon="search"></font-awesome-icon>
                </div>
              </div>
              <b-input
                type="text"
                id="search"
                class="mr-2"
                :placeholder="
                  searchType == 'tagsPosts'
                    ? 'Search by tag'
                    : 'Search by title'
                "
                v-model="search"
                @keyup="searchPostTimer"
                :disabled="searchType == 'trendingUsers'"
              ></b-input>
            </div>
          </div>
        </div>

        <div class="row d-md-none">
          <div class="col text-center">
            <b-form-radio-group
              id="btn-radios-1"
              v-model="searchType"
              :options="options"
              buttons
              class="mr-1 ml-1"
              v-on:change="searchRadioChange"
              button-variant="info"
            ></b-form-radio-group>
          </div>
        </div>
      </div>
    </header>

      <Cards v-bind:cards="cards"></Cards>
      <UserCards v-bind:cards="userCards"></UserCards>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Cards from "@/components/Cards.vue";
import UserCards from "@/components/UserCards.vue";

export default {
  name: "Dashboard",
  components: {
    Cards,
    UserCards
  },
  computed: mapState({
    config: state => state.config
  }),
  data() {
    return {
      searchType: "followingPosts",
      search: "",
      searchWaitingToExecute: null,
      cards: [],
      userCards: [],
      options: [
        { text: "Following", value: "followingPosts" },
        { text: "Trending", value: "trendingPosts" },
        { text: "Tag", value: "tagsPosts" },
        { text: "User", value: "trendingUsers" }
      ]
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: this.config.apiBaseUrl + "getPosts.php",
      withCredentials: true,
      params: {
        action: this.searchType,
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
  },
  methods: {
    searchRadioChange(value) {
      this.searchType = value;
      this.searchPosts();
    },
    searchPostTimer() {
      if (this.searchWaitingToExecute == null) {
        this.searchWaitingToExecute = this.search;
        setTimeout(this.searchPosts, 200);
      }
    },
    searchPosts() {
      if (this.searchWaitingToExecute == this.search) {
        axios({
          method: "GET",
          url: this.config.apiBaseUrl + "getPosts.php",
          withCredentials: true,
          params: {
            action: this.searchType,
            search: this.search
          }
        })
          .then(response => {
            if (response.data.status == 200) {
              if (this.searchType != "trendingUsers") {
                this.cards = response.data.data;
                this.userCards = [];
              } else {
                this.cards = [];
                this.userCards = response.data.data;
              }
            }
          })
          .then(error => {
            this.error = error;
          });
        this.searchWaitingToExecute = null;
      } else {
        this.searchWaitingToExecute = null;
        this.searchPostTimer();
      }
    }
  }
};
</script>
