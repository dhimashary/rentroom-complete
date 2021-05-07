import Vue from 'vue';
import Vuex from 'vuex';
import customerApi from '../api/customerAPI';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accommodations: [],
    bookmarks: [],
    totalPage: 0,
    currentPage: 1,
    filterOptions: {
      location: '',
      name: '',
      minprice: '',
      maxprice: '',
      type: [],
    },
    loadingAccommodation: false,
    loadingBookmark: false,
  },
  mutations: {
    SET_ACCOMMODATIONS(state, payload) {
      state.accommodations = payload.rows;
      state.accommodationCount = payload.count;
      state.totalPage = Math.ceil(payload.count / 12);
    },
    SET_BOOKMARKS(state, payload) {
      state.bookmarks = payload;
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage = payload.page;
    },
    UPDATE_FILTER_OPTIONS(state, payload) {
      if (payload.minprice) {
        state.filterOptions = {
          ...state.filterOptions,
          minprice: +payload.minprice,
        };
      } else if (payload.maxprice) {
        state.filterOptions = {
          ...state.filterOptions,
          maxprice: +payload.maxprice,
        };
      } else {
        state.filterOptions = {
          ...state.filterOptions,
          ...payload,
        };
      }
    },
    UPDATE_TYPE_FILTER_OPTIONS(state, payload) {
      if (payload.option === 'remove') {
        state.filterOptions.type = state.filterOptions.type.filter((num) => num !== payload.type);
      } else {
        state.filterOptions.type.push(payload.type);
      }
    },
    SET_LOADING_ACCOMMODATION(state, payload) {
      state.loadingAccommodation = payload;
    },
    SET_LOADING_BOOKMARK(state, payload) {
      state.loadingBookmark = payload;
    },
    ADD_NEW_BOOKMARK(state, payload) {
      state.bookmarks.push(payload);
    },
  },
  actions: {
    fetchAccommodations(context) {
      context.commit('SET_LOADING_ACCOMMODATION', true);
      Vue.$toast.open({
        message: 'Loading Available Accommodation, Please Wait',
        type: 'info',
        duration: 0,
        position: 'top-right',
      });
      customerApi({
        method: 'GET',
        url: `/accommodations?page=${context.state.currentPage}${context.getters.requestQueryFormat}`,
      })
        .then(({ data }) => {
          context.commit('SET_ACCOMMODATIONS', data);
          context.commit('SET_LOADING_ACCOMMODATION', false);
        })
        .catch((err) => {
          Vue.$toast.open({
            type: 'error',
            duration: 2000,
            message: err.response.data.message,
            position: 'top-right',
          });
        })
        .finally(() => {
          Vue.$toast.clear();
        });
    },
    register(_, payload) {
      const { email, password } = payload;
      Vue.$toast.open({
        message: 'Loading Registration, Please Wait',
        type: 'info',
        duration: 0,
        position: 'top-right',
      });
      customerApi({
        method: 'POST',
        url: '/register',
        data: {
          email,
          password,
        },
      })
        .then(({ data }) => {
          localStorage.access_token = data.accessToken;
          router.push('/');
        })
        .catch((err) => {
          Vue.$toast.open({
            message: err.response.data.message,
            type: 'error',
            duration: 0,
            position: 'top-right',
          });
        })
        .finally(() => {
          setTimeout(() => {
            Vue.$toast.clear();
          }, 2000);
        });
    },
    login(_, payload) {
      const { email, password } = payload;
      Vue.$toast.open({
        message: 'Loading, Please Wait',
        type: 'info',
        duration: 0,
        position: 'top-right',
      });
      customerApi({
        method: 'POST',
        url: '/login',
        data: {
          email,
          password,
        },
      })
        .then(({ data }) => {
          localStorage.access_token = data.accessToken;
          router.push('/');
        })
        .catch((err) => {
          Vue.$toast.open({
            message: err.response.data.message,
            type: 'error',
            duration: 0,
            position: 'top-right',
          });
        })
        .finally(() => {
          setTimeout(() => {
            Vue.$toast.clear();
          }, 2000);
        });
    },
    fetchBookmarks(context) {
      context.commit('SET_LOADING_BOOKMARK', true);
      // Vue.$toast.open({
      //   message: 'Loading Your Bookmark, Please Wait',
      //   type: 'info',
      //   duration: 0,
      //   position: 'top-right',
      // });
      customerApi({
        method: 'GET',
        url: '/bookmarks',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          context.commit('SET_BOOKMARKS', data);
          context.commit('SET_LOADING_BOOKMARK', false);
        })
        .catch((err) => {
          Vue.$toast.open({
            message: err.response.data.message,
            type: 'error',
            duration: 0,
            position: 'top-right',
          });
        })
        .finally(() => {
          setTimeout(() => {
            Vue.$toast.clear();
          }, 2000);
        });
    },
    createBookmarks(context, payload) {
      if (localStorage.access_token) {
        Vue.$toast.open({
          message: 'Create a Bookmark, Please Wait',
          type: 'info',
          duration: 0,
          position: 'top-right',
        });
        customerApi({
          method: 'POST',
          url: '/bookmarks',
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            accommodationId: payload.id,
          },
        })
          .then(({ data }) => {
            context.commit('ADD_NEW_BOOKMARK', data);
            Vue.$toast.open({
              type: 'success',
              duration: 0,
              message: 'Success Creating a Bookmark',
              position: 'top-right',
            });
          })
          .catch((err) => {
            Vue.$toast.open({
              message: err.response.data.message,
              type: 'error',
              duration: 0,
              position: 'top-right',
            });
          })
          .finally(() => {
            setTimeout(() => {
              Vue.$toast.clear();
            }, 2000);
          });
      } else {
        Vue.$toast.open({
          message: 'You must Login First',
          type: 'error',
          duration: 2000,
          position: 'top-right',
        });
      }
    },
  },
  getters: {
    requestQueryFormat(state) {
      const { filterOptions } = state;
      let queryFormat = '';
      if (filterOptions.location) {
        queryFormat += `&location=${filterOptions.location}`;
      }
      if (filterOptions.type.length > 0) {
        const typeList = filterOptions.type.join(',');
        queryFormat += `&type=${typeList}`;
      }
      if (filterOptions.name) {
        queryFormat += `&name=${filterOptions.name}`;
      }
      if (filterOptions.minprice < filterOptions.maxprice) {
        queryFormat += `&minprice=${filterOptions.minprice}`;
        queryFormat += `&maxprice=${filterOptions.maxprice}`;
      } else if (filterOptions.minprice >= 0 && filterOptions.minprice !== '' && filterOptions.maxprice === '') {
        queryFormat += `&minprice=${filterOptions.minprice}`;
      } else if (filterOptions.maxprice >= 0 && filterOptions.maxprice !== '' && filterOptions.minprice === '') {
        queryFormat += `&maxprice=${filterOptions.maxprice}`;
      }
      return queryFormat;
    },
  },
  modules: {
  },
});
