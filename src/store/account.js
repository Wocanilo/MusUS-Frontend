const state = {
  isLoggedIn: false,
  username: null,
  firstName: null,
  surname: null,
  email: null,
  userId: null,
  followedUsers: [],
  pictureVotes: []
};

const mutations = {
  logout(state) {
    state.isLoggedIn = false;
    state.username = null;
    state.firstName = null;
    state.surname = null;
    state.email = null;
    state.userId = null;
    state.followedUsers = [];
    state.pictureVotes = [];
  },
  login(state, data) {
    state.isLoggedIn = true;
    state.username = data.username;
    state.firstName = data.firstName;
    state.surname = data.surname;
    state.email = data.email;
    state.userId = data.userId;
    state.followedUsers = data.followedUsers;
    state.pictureVotes = data.pictureVotes;
  },
  updateFollowed(state, data) {
    state.followedUsers = data;
  },
  updatePictureVotes(state, data) {
    state.pictureVotes = data;
  }
};

export default {
  state,
  mutations
};
