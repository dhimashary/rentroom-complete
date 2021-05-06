import Vue from 'vue';
import Vuex from 'vuex';
import customerApi from '../api/customerAPI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accommodations: [],
    totalPage: 0,
    currentPage: 1,
    filterOptions: {
      location: '',
      name: '',
      minprice: 0,
      maxprice: 0,
    },
  },
  mutations: {
    SET_ACCOMMODATIONS(state, payload) {
      state.accommodations = payload.rows;
      state.accommodationCount = payload.count;
      state.totalPage = Math.ceil(payload.count / 12);
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage = payload.page;
    },
    UPDATE_FILTER_OPTIONS(state, payload) {
      console.log('called');
      state.filterOptions = {
        ...state.filterOptions,
        ...payload,
      };
      console.log(state);
    },
  },
  actions: {
    fetchAccommodations(context) {
      customerApi({
        method: 'GET',
        url: `/accommodations?page=${context.state.currentPage}`,
      })
        .then(({ data }) => {
          context.commit('SET_ACCOMMODATIONS', data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  },
});
