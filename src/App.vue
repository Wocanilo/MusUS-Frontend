<template>
  <div class="app">
    <b-navbar class="mb-2" variant="white" toggleable="sm" sticky>
      <b-navbar-brand class="mb-0">
        <img
          src="@/assets/img/logo.svg"
          width="35"
          height="35"
          class="d-inline-block align-top"
          alt="MusUS logo"
        />
        <b-link class="ml-1" to="/">MusUS</b-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto text-center">
          <!-- Authenticated users -->
          <div v-if="userData.isLoggedIn">
            <b-link class="mr-3" to="/dashboard">Dashboard</b-link>
            <b-link class="mr-3" to="/createPost">Post</b-link>
            <b-link class="mr-3" :to="'/profile/' + userData.userId">{{
              userData.username
            }}</b-link>
            <b-link @click="logout">Logout</b-link>
          </div>

          <!-- Anonymous users -->
          <div v-else>
            <b-link class="mr-3" to="/login">Login</b-link>
            <b-link to="/signup">Signup</b-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "App",
  components: {},
  computed: mapState({
    userData: status => status.account,
    config: state => state.config
  }),
  methods: {
    logout() {
      // Logout
      axios({
        method: "GET",
        url: this.config.apiBaseUrl + "logout.php",
        withCredentials: true
      });
      this.$store.commit("logout");
      if (this.$router.currentRoute.path != "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>
