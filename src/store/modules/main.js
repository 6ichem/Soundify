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
    if (res.data.artists) {
      commit("returnResults", res.data.artists);
    } else {
      console.log("not found");
    }
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
