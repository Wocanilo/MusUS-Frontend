<template>
  <div class="Comments">
      <b-container>
        <b-row v-for="item in comments" :key="item.commentId">
          <div class="card w-100 ml-1 mr-1 mb-3">
            <div class="card-body">
              <p>{{ item.comment }}</p>
              <div class="border-top my-1"></div>
              <small class="text-muted"><b-link class="mr-3" :to="'/profile/' + item.userId">@{{ item.username }}</b-link></small>
            </div>
          </div>
        </b-row>
        <b-row v-if="comments.length == 0">
            <b-col>
                <h5 class="text-center">No comments yet. Be the first!</h5>
            </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Comments",
  components: {},
  props: ["comments"],
  computed: mapState({
    userData: status => status.account,
    config: status => status.config
  })
};
</script>
