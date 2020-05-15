<template>
  <div class="editpost">
    <div>
      <h1 class="text-center">Edit Post</h1>
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
              <b-form @submit="editPost">
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
                    <b-form-radio id="isURL" value="URL">URL</b-form-radio>
                    <b-form-radio id="isFile" value="File"
                      >File upload</b-form-radio
                    >
                  </b-form-radio-group>
                </b-form-group>

                <b-form-group label="File:" v-if="form.isExternal == 'File'">
                  <b-form-file
                    v-model="form.file"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept="image/jpeg, image/png"
                  ></b-form-file>
                  <b-form-invalid-feedback :state="form.fileTooLarge">
                    File too large.
                  </b-form-invalid-feedback>
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
                    <b-form-radio id="isPublic" value="Public"
                      >Public</b-form-radio
                    >
                    <b-form-radio id="isPrivate" value="Private"
                      >Private</b-form-radio
                    >
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
                  <b-form-invalid-feedback :state="form.cantDeleteComments">
                    Posts with comments can't be deleted.
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="form.swearing">
                    Swearing not allowed.
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="form.cantChangeVisibility">
                    Can't change visibility of a post with comments.
                  </b-form-invalid-feedback>
                  <b-button type="submit" class="mt-1" variant="primary"
                    >Save changes</b-button
                  >
                  <b-button
                    class="ml-1 mt-1"
                    v-on:click="deletePost"
                    variant="danger"
                    >Delete Post</b-button
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
  name: "EditPost",
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
        fileTooLarge: true,
        cantDeleteComments: true,
        swearing: true,
        cantChangeVisibility: true
      }
    };
  },
  watch: {
    // Call the method if the route changes
    $route: "loadPostData"
  },
  created() {
    this.loadPostData();
  },
  // Methods available to the view
  methods: {
    loadPostData() {
      this.error = this.post = null;
      this.loading = true;

      axios({
        method: "GET",
        url: this.config.apiBaseUrl + "getPosts.php",
        withCredentials: true,
        params: {
          pictureId: this.$route.params.id,
          action: "getPost"
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            // Update values
            document.getElementById("title").value = response.data.data.title;
            this.form.title = response.data.data.title;

            if (response.data.data.isExternal == 0) {
              document.getElementById("isFile").checked = true;
              this.form.isExternal = "File";
            } else {
              document.getElementById("isURL").checked = true;
              this.form.isExternal = "URL";

              this.form.url = response.data.data.URL;
            }

            document.getElementById("description").value =
              response.data.data.description;
            this.form.description = response.data.data.description;

            if (response.data.data.visibility == 1) {
              // Is public
              document.getElementById("isPublic").checked = true;
              this.form.visibility = "Public";
            } else {
              document.getElementById("isPrivate").checked = true;
              this.form.visibility = "Private";
            }

            // Clean tags
            let tags = [];
            response.data.data.tags.forEach(element => {
              tags.push(element.tag);
            });
            document.getElementById("tags").value = tags;
            this.form.tags = tags;
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
    editPost(evt) {
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
      formData.append("pictureId", this.$route.params.id);

      axios({
        method: "POST",
        url: this.config.apiBaseUrl + "post.php",
        withCredentials: true,
        data: formData
      })
        .then(response => {
          if (response.data.status == 200) {
            this.$router.push("/post/" + this.$route.params.id);
          } else if (response.data.status == 413) {
            this.form.fileTooLarge = false;
          } else if (response.data.status == 601) {
            this.form.swearing = false;
          } else if (response.data.status == 604) {
            this.form.cantChangeVisibility = false;
          } else {
            this.form.validForm = false;
          }
        })
        .then(function(error) {
          console.log(error);
        });
    },
    deletePost(evt) {
      evt.preventDefault();
      axios({
        method: "DELETE",
        url: this.config.apiBaseUrl + "post.php",
        withCredentials: true,
        data: {
          pictureId: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            this.$router.push("/");
          } else if (response.data.status == 409) {
            this.form.cantDeleteComments = false;
          }
        })
        .then(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
