<template>
  <q-page 
  class="q-pa-lg"
  v-if="loginState == 'false'"
  >
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md"
      >
      <div class="col">
        <h5 class="">Welcome!</h5>
        <q-input 
        bottom-slots 
        class="new-devitt"
        v-model="DevitterId" 
        placeholder="ID (email address)" 
        autogrow
        >
        </q-input>
        <q-input 
        bottom-slots 
        class="new-devitt"
        v-model="DevitterPw" 
        placeholder="Password" 
        autogrow
        type="password"
        >
        </q-input>
          <q-checkbox v-model="remember" label="Remember this account info?" color="blue"/>

          <q-btn 
            @click.prevent="validate"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Sign in"
            no-caps />    
      </div>
      </div>
      <!-- <div class="col col-shrink">
      </div> -->
      <p> wanna create account? </p>
      <div class="col col-shrink">
          <q-btn 
            to="/signup"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Sign-Up"
            no-caps />
      </div>
      <div class="col col-shrink">
      </div>
  </q-page>


  <q-page 
  class="q-pa-lg"
  v-if="loginState != 'false'"
  >
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md"
      >
      <div class="col">
        <h5 class="">See u soon!</h5>
          <q-btn 
            @click.prevent="signout()"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Sign Out"
            no-caps />    
      </div>
      </div>
  </q-page>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { auth } from 'src/boot/firebase'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { mapActions, mapGetters } from 'vuex'


export default defineComponent({
  name: 'Signin',
  
  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    const $store = useStore()
    
    var DevitterId = ref('')
    var DevitterPw = ref('')
    var userEmail = ref('')
    var userName = ref('')
    var loginState = ref('false')
    var remember = ref('false')
    var validationErrors = ref('')

    auth.onAuthStateChanged((user) => {
      if (user) {
        loginState.value = 'true'
      }
      else {
        console.log("login state changed")
      }
    })

    let validate = () => {
        if(!DevitterId.value) {
            $q.notify({
                position : "center",
                message : "please input your ID.",
                color : "blue"
            })
        }
        else if(/.+@.+/.test(DevitterId.value) != true) {
            $q.notify({
                position : "center",
                message : "check your ID again.",
                color : "blue"
            })
        }
        else if (!DevitterPw.value) {
            $q.notify({
                position : "center",
                message : "please input your PW.",
                color : "blue"
            })
         }
        else if (/.{6,}/.test(DevitterPw.value) != true) {
            $q.notify({
                position : "center",
                message : "PW is 6 character at least.",
                color : "blue"
            })
         }
        else if(validationErrors.value <= 0) {
            signin();
         }
    }

    let signin = () => {
        auth.signInWithEmailAndPassword(DevitterId.value, DevitterPw.value)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("success", user);
          $q.notify({
              position : "center",
              message : "hello, " + user.email,
              color : "blue"
          })
          $store.commit("userState", user)
        })
        .catch((error) => {
          $q.notify({
              position : "center",
              message : error.message,
              color : "blue"
          })
        })
        $router.push({ path: '/'})
      }

      let signout = () => {
        auth.signOut()
        .then(() => {
          $q.notify({
              position : "center",
              message : "SignOut success!",
              color : "blue"
          })
          $router.push({ path: '/'})
        })
      }

      return {DevitterId, DevitterPw, userEmail, userName, 
              loginState, remember, signin, signout, validate}
  },
  computed: {
    ...mapGetters(["getUserState", "isUserAuth"])
  },
  methods: {
    ...mapActions(["signOutAction", "authAction"]),
  }
})
</script>

<style lang="sass">
.new-devitt
  font-size: 19px
  line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-3

.devitt-contents
  white-space: pre-line

.devitt-icons
  margin-left: -5px
</style>