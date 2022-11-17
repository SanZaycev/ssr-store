import {viewsDescriptions, viewsTitles} from "../core/state.js";
import {isEmptyString} from "../services/getters.js";

export default () => ({
    namespaced: true,
    state: {
        title: viewsTitles.DEFAULT,
        description: viewsDescriptions.DEFAULT
    },
    getters: {
        getTitle: state => state.title,
        getDescription: state => state.description,
    },
    mutations: {
        setTitle(state, title) {
            if (!isEmptyString(title)){
                state.title = title;
            }
        },
        setDescription(state, description) {
            if (!isEmptyString(description)){
                state.description = description;
            }
        }
    },
    actions: {
        async setMeta({ commit }, { title, description }) {
            commit('setTitle', title);
            commit('setDescription', description)
        }
    }
})
