export const state = () => ({
    texts: []
})

export const mutations = {
    set (state, texts) {
        if (texts) {
            state.texts = texts
        }
    }
}

export const getters = {
    get (state) {
        return state.texts
    }
}
