import axios from "axios";

const state = {
  results: [],
};

const getters = {
  searchResult: (state) => state.results,
};

const actions = {
  async getSearchResults({ commit }, query) {
    const res = await axios.get(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${query}`
    );
    // Execute the mutation which receive the data and pass to the state
    commit("returnResults", res.data.artists);
  },
  /*async getSearchResults() {
    const res = await axios.get(
      "https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay"
    );

    console.log(res.data.artists[0].strArtist);
  },*/
};

const mutations = {
  returnResults: (state, results) => (state.results = results),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
