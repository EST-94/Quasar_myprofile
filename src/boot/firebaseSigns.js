
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { auth } from 'src/boot/firebase'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { mapActions, mapGetters } from 'vuex'


export const firebaseSigns = ({
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