import axios from "axios";

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },
};

export const state = () => ({
  application: null,
});

export const mutations = {
  SET_APPLICATION(state, application) {
    state.application = application;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { i18n }) {
    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.apiToken}`,
      },
    };

    var q = process.env.API_URL +
    `/applications?filters[slug][$eq]=${process.env.application}-${i18n.locale}&populate=footer&populate=footer.logo1&populate=footer.logo2&populate=footer.logo3&populate=footer.logo4&populate=footer.logo5&populate=guide_more_image&locale=${i18n.locale}&token=${process.env.apiToken}&populate=guide_template`
    var { data } = await axios.get(
      q,
      headers
    );
    commit("SET_APPLICATION", data.data[0]);
  },
};
