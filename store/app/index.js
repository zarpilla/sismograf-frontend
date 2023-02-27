export const state = () => ({
    app: {}
})

export const mutations = {
    set (state, app) {
        console.log('set', app)
        if (app) {
            state.app = app
        }
    }
}

export const getters = {    
    get (state) {
        console.log('get', state)
        return state.app
    }
}
