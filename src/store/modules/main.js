import axios from "axios";

const state = {
  results: [],
  query: "",
};

const getters = {
  searchResult: (state) => state.results,
};

const actions = {
  async getSearchResults({ commit }) {
    const res = await axios.get(
      "https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay"
    );

    commit("returnResults", res.data);
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
