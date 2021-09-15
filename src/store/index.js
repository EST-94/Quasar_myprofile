import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import { auth } from 'src/boot/firebase'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    state: {
      userState:null
    },
    actions: {
      signOutAction({commit}) {
        auth.signOut().then(() => {
          commit("userSet", null)
        })
      },
      authAction({commit}) {
        auth.onAuthStateChanged(user =>{
          if (user) {
            commit("userSet", user)
          }
        })
      },
    },
    mutations: {
      userSet(state, firebaseUser){
        state.userState = firebaseUser
      }
    },
    getters: {
      getUserState(state){
        return state.userState
      },
      isUserAuth(state){
        return !!state.userState
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
