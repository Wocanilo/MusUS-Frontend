<template>
  <div class="post">
    <!-- Content -->
    <header>
      <b-container fluid v-if="post">
        <b-row>
          <b-col>
            <blockquote class="blockquote text-center">
              <h1 class="mb-0">{{ post.title }}</h1>
              <footer class="text-muted">
                <b-link class="mr-3" :to="'/profile/' + post.userId">@{{ post.username }}</b-link>
                <form action="#">
                  <button v-on:click="followUser" class="btn btn-link" v-if="post.userId != userData.userId && userData.followedUsers.indexOf(post.userId) < 0">Follow</button>
                  <button v-on:click="unFollowUser" class="btn btn-link" v-if="post.userId != userData.userId && userData.followedUsers.indexOf(post.userId) >= 0">Unfollow</button>
                </form>
              </footer>
            </blockquote>
          </b-col>
        </b-row>
      </b-container>
    </header>

    <section v-if="post">
      <b-container class="text-center">
      <b-overlay :show="showHeartFull || showHeartNotFull">
        <img
          :src="post.isExternal ? post.URL : config.apiBaseUrl + post.URL"
          class="img-fluid"
          alt=""
          v-on:click="votePicture"
        />
      <template v-slot:overlay>
        <div class="text-center" v-if="showHeartFull">
          <b-icon icon="heart-fill" font-scale="5"></b-icon>
        </div>
        <div class="text-center" v-if="showHeartNotFull">
          <b-icon icon="heart" font-scale="5"></b-icon>
        </div>
      </template>
    </b-overlay>
      </b-container>
      <b-container>
        <!-- Post Data -->
        <b-row>
          <b-col>
            <font-awesome-icon icon="calendar"></font-awesome-icon>
            {{ post.createdAt }}
          </b-col>
          <b-col class="text-center" v-if="post.userId == userData.userId">
            <font-awesome-icon icon="edit"></font-awesome-icon>
            <b-link class="ml-1" :to="$route.params.id + '/edit'">Edit</b-link>
          </b-col>
          <b-col class="mb-2">
            <div class="float-right">
              <font-awesome-icon icon="thumbs-up" class="mr-1"></font-awesome-icon>20 likes
            </div>
          </b-col>
        </b-row>

        <div class="row ml-1 mr-1">
          <p>{{ post.description }}</p>
        </div>

        <!-- Tags -->
        <div class="row">
          <div class="col text-center">
            <font-awesome-icon icon="tags"></font-awesome-icon>
            {{ post.tags }}
          </div>
        </div>
      </b-container>
    </section>

    <!-- Comments -->
    <section>
      <div class="container">
        <div class="row mt-3">
          <div class="col">
            <h2 class="text-center">Comments</h2>
          </div>
        </div>
      </div>
      <Comments v-bind:comments="comments"></Comments>

      <!-- New comment -->
      <div class="container">
        <div class="border-top my-4"></div>
        <!-- Horizontal separator -->
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <b-form @submit="commentPost">
                  <b-form-group>
                    <b-form-textarea
                      id="comment"
                      rows="3"
                      placeholder="Start writing your lovely comment..."
                      v-model="comment"
                      :state="isValidComment"
                      required
                    ></b-form-textarea>
                    <p class="float-right">{{ commentLength() }}/140 characters</p>
                    <b-button type="submit" block variant="dark" :disabled="!(comment != '' || comment.length > 140 || !disableCommentButton)">Post</b-button>
                  </b-form-group>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Comments from "@/components/Comments.vue"

export default {
  name: "Post",
  // Data needed from Vuex
  components: {
    Comments
  },
  computed: mapState({
    config: state => state.config,
    userData: state => state.account,
    isValidComment: function(){
      return this.comment != "" && this.comment.length <= 140;
    }
  }),
  // Form data
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      comment: "",
      validComment: false,
      comments: [],
      disableCommentButton: false,
      showHeartFull: false,
      showHeartNotFull: false,
      followBlock: false,
      voteBlock: false
    };
  },
  created() {
    this.loadPost(); // Load the data after the view has been rendered
    this.loadComments();
  },
  watch: {
    // Call the method if the route changes
    $route: ["loadPost", "loadComments"]
  },
  // Methods available to the view
  methods: {
    loadPost() {
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
            this.post = response.data.data;
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
    loadComments(){
      axios({
        method: "GET",
        url: this.config.apiBaseUrl + "comment.php",
        withCredentials: true,
        params: {
          pictureId: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            this.comments = response.data.data;
          }
        })
        .then(error => {
          this.error = error;
        });
    },
    commentPost(evt){
      evt.preventDefault();
      // Disable button
      this.disableCommentButton = true;

      axios({
        method: "POST",
        url: this.config.apiBaseUrl + "comment.php",
        withCredentials: true,
        data: {
          id: this.$route.params.id,
          comment: this.comment
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            // Update comments
            this.loadComments();
          } else {
            // Error
            console.log(response.data);
          }
          // Reenable button / Clear comment
          this.comment = "";
          this.disableCommentButton = false;
        })
        .then(function(error) {
          console.log(error);
          // Reenable button
          this.disableCommentButton = false;
        });
    },
    commentLength(){
      return this.comment.length;
    },
    followUser(){
        if(!this.followBlock){
          this.followBlock = true;
          let formData = new FormData();
          formData.append("action", "follow");
          formData.append("userId", this.post.userId);
          
        axios({
          method: "POST",
          url: this.config.apiBaseUrl + "profile.php",
          withCredentials: true,
          data: formData
        })
          .then(response => {
            if (response.data.status == 200) {
                let newFollowedUsers = this.userData.followedUsers;
                newFollowedUsers.push(this.post.userId);
                this.$store.commit('updateFollowed', newFollowedUsers);
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
    unFollowUser(){
      if(!this.followBlock){
        this.followBlock = true;
        let formData = new FormData();
        formData.append("action", "unfollow");
        formData.append("userId", this.post.userId);
        
      axios({
        method: "POST",
        url: this.config.apiBaseUrl + "profile.php",
        withCredentials: true,
        data: formData
      })
        .then(response => {
          if (response.data.status == 200) {
              let newFollowedUsers = this.userData.followedUsers;
              let location = newFollowedUsers.indexOf(parseInt(this.post.userId));
              if(location >=0) newFollowedUsers.splice(location, 1);
              
              this.$store.commit('updateFollowed', newFollowedUsers);
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
    votePicture(){
      if(!this.voteBlock){
        this.voteBlock = true;
        let newpictureVotes = this.userData.pictureVotes;
        let pictureID = this.$route.params.id;

      if(newpictureVotes.indexOf(parseInt(pictureID)) < 0){
        axios({
          method: "GET",
          url: this.config.apiBaseUrl + "getPosts.php",
          withCredentials: true,
          params: {
            pictureId: pictureID,
            action: "votePost"
          }
        })
          .then(response => {
            if (response.data.status == 200) {
                newpictureVotes.push(parseInt(pictureID));
                // Condicion de carrera con la lista, comprobar en follow tambien
                this.$store.commit('updatePictureVotes', newpictureVotes);
                this.showHeartFull = true;
                //Waste 1 second
                setTimeout(() => {
                  this.showHeartFull = false;
                }, 600)
            } else {
              console.log(response.data);
            }
          })
          .then(function(error) {
            console.log(error);
          });
      }else{
        axios({
          method: "GET",
          url: this.config.apiBaseUrl + "getPosts.php",
          withCredentials: true,
          params: {
            pictureId: pictureID,
            action: "unVotePost"
          }
        })

          .then(response => {
            if (response.data.status == 200) {
                let location = newpictureVotes.indexOf(parseInt(pictureID));
                if(location >=0) newpictureVotes.splice(location, 1);

                this.$store.commit('updatePictureVotes', newpictureVotes);
                this.showHeartNotFull = true;
                //Waste 1 second
                setTimeout(() => {
                  this.showHeartNotFull = false;
                }, 600)
            } else {
              console.log(response.data);
            }
          })
          .then(function(error) {
            console.log(error);
          });
      }
        this.voteBlock = false;
      }

    }
  }
};
</script>
