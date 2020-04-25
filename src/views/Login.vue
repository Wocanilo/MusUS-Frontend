<template>
  <div class="login">
    <div>
      <h1 class="text-center">Login</h1>
    </div>
    <!-- Trees separator -->
    <img src="@/assets/img/forest.jpg" class="img-fluid w-100" alt="MusUS logo" />
    <!-- Content -->
    <section>
      <b-container>
        <b-row>
          <b-col>
            <b-jumbotron>
              <b-form @submit="login">
                <b-form-group label="Username:" label-for="username">
                  <b-form-input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="Username"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Password:" label-for="password">
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                    required
                  ></b-form-input>
                </b-form-group>

                <div class="text-center">
                  <b-form-invalid-feedback
                    :state="form.validForm"
                  >Check username and password for errors</b-form-invalid-feedback>
                  <b-button type="submit" variant="primary">Login</b-button>
                </div>
              </b-form>
            </b-jumbotron>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Login",
  // Data needed from Vuex
  components: {},
  computed: mapState({
    config: state => state.config,
    userData: state => state.account
  }),
  // Form data
  data() {
    return {
      form: {
        username: "",
        password: "",
        validForm: true
      }
    };
  },
  // Methods available to the view
  methods: {
    login(evt) {
      evt.preventDefault();
      axios({
        method: "POST",
        url: this.config.apiBaseUrl + "login.php",
        withCredentials: true,
        data: {
          username: this.form.username,
          password: this.form.password
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            this.$store.commit('login')
            this.$router.push("/");
          } else {
            this.form.validForm = false;
          }
        })
        .then(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
