<template>
  <div class="createpost">
    <div>
      <h1 class="text-center">Create Post</h1>
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
              <b-form @submit="CreatePost">
                <b-form-group label="Title:" label-for="title">
                  <b-form-input
                    id="title"
                    v-model="form.title"
                    type="text"
                    placeholder="A beautiful title"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Type:">
                  <b-form-radio-group
                    id="external"
                    v-model="form.isExternal"
                    name="external"
                    required
                  >
                    <b-form-radio value="URL">URL</b-form-radio>
                    <b-form-radio value="File">File upload</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>

                <b-form-group label="File:" v-if="form.isExternal == 'File'">
                  <b-form-file
                    v-model="form.file"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept="image/jpeg, image/png"
                    required
                  ></b-form-file>
                </b-form-group>

                <b-form-group
                  label="URL:"
                  label-for="url"
                  v-if="form.isExternal == 'URL'"
                >
                  <b-form-input
                    id="url"
                    v-model="form.url"
                    type="url"
                    placeholder="URL"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Description:" label-for="description">
                  <b-form-textarea
                    id="description"
                    placeholder="An awesome description here..."
                    rows="3"
                    max-rows="5"
                    v-model="form.description"
                    required
                  ></b-form-textarea>
                </b-form-group>

                <b-form-group label="Visibility:">
                  <b-form-radio-group
                    id="visibility"
                    v-model="form.visibility"
                    name="visibility"
                    required
                  >
                    <b-form-radio value="Public">Public</b-form-radio>
                    <b-form-radio value="Private">Private</b-form-radio>
                  </b-form-radio-group>
                  <b-form-text
                    id="public-help-block"
                    v-if="form.visibility == 'Public'"
                  >
                    Public posts can be seen by anyone!
                  </b-form-text>
                  <b-form-text
                    id="private-help-block"
                    v-if="form.visibility == 'Private'"
                  >
                    Private posts can only be seen by you.
                  </b-form-text>
                </b-form-group>

                <b-form-group label="Tags:" label-for="tags">
                  <b-form-tags
                    input-id="tags"
                    v-model="form.tags"
                    tag-variant="info"
                    separator=" ,;"
                    placeholder="Enter new tags separated by space, comma or semicolon"
                    no-add-on-enter
                    remove-on-delete
                    class="mb-2"
                  ></b-form-tags>
                </b-form-group>

                <div class="text-center">
                  <b-form-invalid-feedback :state="form.swearing">
                    Swearing not allowed.
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="form.postsLimit">
                    Limit of posts reached.
                  </b-form-invalid-feedback>
                  <b-button type="submit" class="mt-1" variant="primary"
                    >Create Post</b-button
                  >
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
  name: "CreatePost",
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
        title: "",
        isExternal: "",
        url: "",
        file: null,
        description: "",
        tags: [],
        visibility: "",
        swearing: true,
        postsLimit: true
      }
    };
  },
  created() {
    this.checkAnonymous();
  },
  // Methods available to the view
  methods: {
    checkAnonymous(){
      if(this.userData.isLoggedIn == false){
            this.$store.commit("setAnonymousError", false);
            this.$router.push("/login");
            return true;
      }
      return false;
    },
    CreatePost(evt) {
      evt.preventDefault();
      let formData = new FormData();

      if (this.form.isExternal == "File" && this.form.file != null) {
        // Uploading file
        formData.append("file", this.form.file);
      } else if (this.form.isExternal == "URL" && this.form.url != "") {
        // Uploading URL
        formData.append("url", this.form.url);
      }
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("tags", this.form.tags);
      formData.append("visibility", this.form.visibility);

      axios({
        method: "POST",
        url: this.config.apiBaseUrl + "post.php",
        withCredentials: true,
        data: formData
      })
        .then(response => {
          if (response.data.status == 200) {
            this.$router.push("/post/" + response.data.postId);
          } else if (response.data.status == 601) {
            this.form.swearing = false;
          } else if (response.data.status == 602) {
            this.form.postsLimit = false;
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
