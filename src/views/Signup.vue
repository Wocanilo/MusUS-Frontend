<template>
  <div class="signup">
    <div>
      <h1 class="text-center">Signup</h1>
    </div>
    <!-- Trees separator -->
    <img
      src="@/assets/img/forest.jpg"
      class="img-fluid w-100"
      alt="MusUS logo"
    />
    <!-- Content -->
    <section>
      <b-container>
        <b-row>
          <b-col>
            <b-jumbotron>
              <b-form @submit="signup">
                <b-form-group label="First Name:" label-for="firstName">
                  <b-form-input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    placeholder="First Name"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Surname:" label-for="surname">
                  <b-form-input
                    id="surname"
                    v-model="form.surname"
                    type="text"
                    placeholder="Surname"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Username:" label-for="username">
                  <b-form-input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="Username"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Email:" label-for="email">
                  <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Email"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Phone:" label-for="phone">
                  <b-form-input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="Phone"
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
                <b-form-group
                  label="Repeat Password:"
                  label-for="repeatPassword"
                >
                  <b-form-input
                    id="repeatPassword"
                    v-model="form.repeatPassword"
                    type="password"
                    placeholder="Repeat Password"
                    :state="passwordsMatch"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback :state="passwordsMatch"
                    >Passwords don't match</b-form-invalid-feedback
                  >
                  <b-form-valid-feedback :state="passwordsMatch"
                    >Passwords match</b-form-valid-feedback
                  >
                </b-form-group>
                <div class="text-center">
                  <b-form-invalid-feedback :state="form.validForm"
                    >Username or Email already
                    registered</b-form-invalid-feedback
                  >
                  <b-button type="submit" variant="primary">Signup</b-button>
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
  name: "Signup",
  // Data needed from Vuex
  components: {},
  computed: mapState({
    config: state => state.config,
    userData: state => state.account,
    passwordsMatch: function() {
      return (
        this.form.password == this.form.repeatPassword &&
        this.form.repeatPassword.length > 0
      );
    }
  }),
  // Form data
  data() {
    return {
      form: {
        firstName: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        tel: "",
        validForm: true
      }
    };
  },
  // Methods available to the view
  methods: {
    signup(evt) {
      evt.preventDefault();

      if (this.form.password == this.form.repeatPassword) {
        axios({
          method: "POST",
          url: this.config.apiBaseUrl + "signup.php",
          withCredentials: true,
          data: {
            firstName: this.form.firstName,
            surname: this.form.surname,
            username: this.form.username,
            password: this.form.password,
            email: this.form.email,
            phone: this.form.phone,
            repeatPassword: this.form.repeatPassword
          }
        })
          .then(response => {
            if (response.data.status == 200) {
              this.$router.push("/login");
            } else {
              this.form.validForm = false;
            }
          })
          .then(function(error) {
            console.log(error);
          });
      } else {
        // Invalid password
      }
    }
  }
};
</script>
