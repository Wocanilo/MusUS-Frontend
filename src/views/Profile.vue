<template>
  <div class="profile">
    <!-- Content -->
    <header>
      <b-container fluid v-if="profile">
        <b-row>
          <b-col>
            <blockquote class="blockquote text-center">
              <h1 class="mb-0">
                {{ profile.firstName }} {{ profile.surname }}
              </h1>
              @{{ profile.username }}
              <footer class="text-muted">
                <a :href="'mailto:' + profile.email">{{ profile.email }}</a>
                <form>
                  <button
                    v-on:click="followUser"
                    class="btn btn-link"
                    v-if="
                      parseInt($route.params.id) != userData.userId &&
                        userData.followedUsers.indexOf(
                          parseInt($route.params.id)
                        ) < 0
                    "
                  >
                    Follow
                  </button>
                  <button
                    v-on:click="unFollowUser"
                    class="btn btn-link"
                    v-if="
                      parseInt($route.params.id) != userData.userId &&
                        userData.followedUsers.indexOf(
                          parseInt($route.params.id)
                        ) >= 0
                    "
                  >
                    Unfollow
                  </button>
                </form>
              </footer>
            </blockquote>
          </b-col>
        </b-row>
        <h4 class="text-center" v-if="posts.length != 0">
          Posts by {{ profile.username }}
        </h4>
        <h5 class="text-center" v-else>No public posts</h5>
      </b-container>
      <Cards v-bind:cards="posts"></Cards>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Cards from "@/components/Cards.vue";

export default {
  name: "Profile",
  components: {
    Cards
  },
  computed: mapState({
    config: state => state.config,
    userData: state => state.account
  }),
  // Form data
  data() {
    return {
      loading: false,
      profile: null,
      error: null,
      posts: [],
      followBlock: false
    };
  },
  mounted() {
    this.loadProfile(); // Load the data after the view has been rendered
    this.loadPosts();
  },
  watch: {
    // Call the method if the route changes
    $route: ["loadProfile", "loadPosts"]
  },
  // Methods available to the view
  methods: {
    loadProfile() {
      this.error = this.post = null;
      this.loading = true;

      axios({
        method: "GET",
        url: this.config.apiBaseUrl + "profile.php",
        withCredentials: true,
        params: {
          userId: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            this.profile = response.data.data;
          } else {
            // Logout user
            this.$store.commit("logout");
            this.$router.push("/");
          }
        })
        .then(error => {
          this.error = error;
        });
    },
    loadPosts() {
      axios({
        method: "GET",
        url: this.config.apiBaseUrl + "getPosts.php",
        withCredentials: true,
        params: {
          userId: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            this.posts = response.data.data;
          } else {
            // Logout user
            this.$store.commit("logout");
            this.$router.push("/");
          }
        })
        .then(error => {
          this.error = error;
        });
    },
    followUser(evt) {
      evt.preventDefault();
      if (!this.followBlock) {
        this.followBlock = true;
        let formData = new FormData();
        formData.append("action", "follow");
        formData.append("userId", parseInt(this.$route.params.id));

        axios({
          method: "POST",
          url: this.config.apiBaseUrl + "profile.php",
          withCredentials: true,
          data: formData
        })
          .then(response => {
            if (response.data.status == 200) {
              let newFollowedUsers = this.userData.followedUsers;
              newFollowedUsers.push(parseInt(this.$route.params.id));
              this.$store.commit("updateFollowed", newFollowedUsers);
            } else {
              console.log(response.data);
            }
          })
          .then(function(error) {
            console.log(error);
            // Reenable button
            this.disableCommentButton = true;
          });
        this.followBlock = false;
      }
    },
    unFollowUser(evt) {
      evt.preventDefault();
      if (!this.followBlock) {
        this.followBlock = true;
        let formData = new FormData();
        formData.append("action", "unfollow");
        formData.append("userId", parseInt(this.$route.params.id));

        axios({
          method: "POST",
          url: this.config.apiBaseUrl + "profile.php",
          withCredentials: true,
          data: formData
        })
          .then(response => {
            if (response.data.status == 200) {
              let newFollowedUsers = this.userData.followedUsers;
              let location = newFollowedUsers.indexOf(
                parseInt(parseInt(this.$route.params.id))
              );
              if (location >= 0) newFollowedUsers.splice(location, 1);

              this.$store.commit("updateFollowed", newFollowedUsers);
            } else {
              console.log(response.data);
            }
          })
          .then(function(error) {
            console.log(error);
            // Reenable button
            this.disableCommentButton = true;
          });
        this.followBlock = false;
      }
    }
  }
};
</script>
