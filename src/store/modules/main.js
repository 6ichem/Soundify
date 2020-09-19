import axios from "axios";

const state = {
  results: [],
  mvs: [],
  albums: [],
  tracks: [],
};

const getters = {
  searchResult: (state) => state.results,
  searchMvs: (state) => state.mvs,
  searchAlbums: (state) => state.albums,
  searchTracks: (state) => state.tracks,
};

const actions = {
  async getSearchResults({ commit, state }, query) {
    const res = await axios.get(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${query}`
    );

    const artistId = res.data.artists[0]["idArtist"];

    const getMv = await axios.get(
      `https://theaudiodb.com/api/v1/json/1/mvid.php?i=${artistId}`
    );

    const getAlbums = await axios.get(
      `https://theaudiodb.com/api/v1/json/1/album.php?i=${artistId}`
    );

    for (const id of getAlbums.data.album.map((e) => e.idAlbum)) {
      const {
        data: { track },
      } = await axios.get(
        `https://theaudiodb.com/api/v1/json/1/track.php?m=${id}`
      );
      state.tracks.push(track);
    }

    /*const getTracks = await axios.get(
      `https://theaudiodb.com/api/v1/json/1/track.php?m=${albumId}`
    );*/

    //console.log(getTracks);

    console.log(state.tracks);

    commit("returnTracks", state.tracks);

    commit("returnAlbums", getAlbums.data.album);

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
  returnAlbums: (state, albums) => (state.albums = albums),
  returnTracks: (state, tracks) => (state.tracks = tracks),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
