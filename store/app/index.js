export const state = () => ({
    app: {}
})

export const mutations = {
    set (state, app) {
        if (app) {
            state.app = app
        }
    }
}

export const getters = {
    get (state) {
        return state.app
    }
}
