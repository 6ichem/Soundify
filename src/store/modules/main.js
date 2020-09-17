import axios from "axios";

const state = {
  results: [],
  mvs: [],
};

const getters = {
  searchResult: (state) => state.results,
  searchMvs: (state) => state.mvs,
};

const actions = {
  async getSearchResults({ commit }, query) {
    const res = await axios.get(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${query}`
    );

    const artistId = res.data.artists[0]["idArtist"];

    const getMv = await axios.get(
      `https://theaudiodb.com/api/v1/json/1/mvid.php?i=${artistId}`
    );

    commit("returnMvs", getMv.data.mvids);

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
  returnMvs: (state, mvs) => (state.mvs = mvs),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
