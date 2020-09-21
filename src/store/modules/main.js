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
  async getSearchResults({ commit }, query) {
    const res = await axios.get(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${query}`
    );

    const artistId = res.data.artists[0]["idArtist"];

    const getMvs = await axios.get(
      `https://theaudiodb.com/api/v1/json/1/mvid.php?i=${artistId}`
    );

    const getAlbums = await axios.get(
      `https://theaudiodb.com/api/v1/json/1/album.php?i=${artistId}`
    );

    // Get the properties we need per album
    const albums = getAlbums.data.album.map(
      ({
        idAlbum: id,
        strAlbum: albumName,
        strDescriptionEN: albumDescription,
      }) => ({ id, albumName, albumDescription })
    );

    const tracks = {};

    for (const album of albums) {
      const { id, albumName, albumDescription } = album;
      const {
        data: { track: list },
      } = await axios.get(
        `https://theaudiodb.com/api/v1/json/1/track.php?m=${id}`
      );
      tracks[id] = { albumDescription, albumName, list };
    }

    commit("returnTracks", tracks);
    commit("returnAlbums", getAlbums.data.album);
    commit("returnMvs", getMvs.data.mvids);
    commit("returnResults", res.data.artists);
  },
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
