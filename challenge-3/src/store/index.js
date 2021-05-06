import Vue from 'vue';
import Vuex from 'vuex';
import customerApi from '../api/customerAPI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accommodations: [],
  },
  mutations: {
    SET_ACCOMMODATIONS(state, payload) {
      console.log('called mutation');
      this.state.accommodations = payload.rows;
    },
  },
  actions: {
    fetchAccommodations(context) {
      console.log('called');
      customerApi({
        method: 'GET',
        url: '/accommodations',
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
