<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col"> 
        <q-input 
        bottom-slots 
        class="new-devitt"
        v-model="newDeviContent" 
        placeholder="What's happening?" 
        counter 
        maxlength="280" 
        autogrow
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <!-- my avatar pic -->
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>
        </q-input>      
      </div>
      <div class="col col-shrink">
          <q-btn 
            v-if="loginState != 'false'"
            disable=!newDeviContent
            @click="addNewDevitt"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Devitt"
            no-caps />
          <q-btn 
            v-if="loginState == 'false'"
            disable=!newDeviContent
            @click="toLogin"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Devitt"
            no-caps />
      </div>
      </div>

      <q-separator size="5px" color="grey-2" class="divider"/>
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
        <q-item 
        class="q-py-md"
        v-for="devitts in devitts"
        :key="devitts.id"
        >
                    <!-- for test - connection getter -->
            <!-- <span class="text-grey-7">
                userEmail = {{ userEmail }}<br/><br/>
                userName = {{ userName }} <br/><br/> -->
            <!-- test code end -->
            <!-- </span> -->
          <q-item-section avatar top>
            <q-avatar size="xl">
              <!-- my avatar pic -->
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1">
              <strong> 
                <!-- JKIM -->
                {{ devitts.userName }}&nbsp;
              </strong>
              <span class="text-grey-7">
                {{ devitts.userEmail }}
                <!-- @asKOPO_smartFintech4 -->
                <br class="lt-md"/> 
                &bull; {{ relativeDate(devitts.date) }}
                </span>
              </q-item-label>
            <q-item-label class="devitt-contents text-body1">
              {{ devitts.content }}
            </q-item-label>
            <div class="devitt-icons row justify-between q-mt-sm">
              <q-btn 
              flat 
              round 
              color="grey" 
              icon="far fa-comment" 
              size="sm"
              />
              <q-btn 
              flat 
              round 
              color="grey" 
              icon="fas fa-retweet" 
              size="sm"
              />
              <q-btn
              flat 
              round 
              @click="likeDevitt(devitts)"
              :color="devitts.liked ? 'pink' : 'grey'" 
              :icon="devitts.liked ? 'fas fa-heart' : 'far fa-heart'" 
              size="sm"
              />
              <q-btn 
              @click="deleteDevitt(devitts)"
              flat 
              round 
              color="grey" 
              icon="fas fa-trash" 
              size="sm"
              />
            </div>
          </q-item-section>
        </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>

  </q-page>
</template>

<script>

import { formatDistance } from 'date-fns'
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { auth, db } from 'src/boot/firebase'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageHome',
  // data() {
  //   return{
  //     newDeviContent: '',
  //     devitts:[
  //     ],
  //   }
  // },
  // methods:{
  //   relativeDate(value) {
  //     return formatDistance(value, new Date())
  //   },
  //   addNewDevitt() {
  //     let newDevitt = {
  //       content: this.newDeviContent,
  //       date: Date.now(),
  //       liked: false,
  //       userEmail: '', 
  //       userName: ''
  //     }
  //     db.collection('devitts').add(newDevitt).then(function(docRef) {
  //       console.log('Document written with ID: ', docRef.id)
  //     }).catch(function(error) {
  //       console.error('Error adding document: ', error)
  //     })
  //     this.newDeviContent = ''
  //   },
  //   deleteDevitt(devitts){
  //     db.collection('devitts').doc(devitts.id).delete().then(() => {
  //         console.log("Document successfully deleted!")
  //     }).catch((error) => {
  //         console.error("Error removing document: ", error)
  //     })
  //   },
  //   likeDevitt(devitts){
  //     db.collection('devitts').doc(devitts.id).set({
  //       userEmail: devitts.userEmail,
  //       userName: devitts.userName,
  //       content: devitts.content,
  //       date: devitts.date,
  //       liked: !devitts.liked,
  //     })
  //     .then(function() {
  //       console.log('Document successfully written! : liked')
  //     })
  //     .catch(function(error) {
  //       console.error('Error writing document: ', error)
  //     })
  //   }
  // },

  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    
    var newDeviContent = ref('')
    var devitts = ref([])
    var userName = ref('')
    var userEmail = ref('')
    var loginState = ref('false')

    auth.onAuthStateChanged((user) => {
      if (user) {
        var userInfos = user.email.split('@')
        userEmail.value = "@" + userInfos[1]
        userName.value = userInfos[0]
        loginState.value = 'true'
      }
      else {
        console.log("session is empty.")
      }
    })

    let relativeDate = (value) => {
      return formatDistance(value, new Date())
    }

    let toLogin = () => {
      $q.notify({
          position : "center",
          message : "you should sign in first!",
          color : "blue"
      })
      $router.push({ path: '/signs'})
    }

    let addNewDevitt = () => {
      let newDevitt = {
        content: newDeviContent.value,
        date: Date.now(),
        liked: false,
        userEmail: userEmail.value, 
        userName: userName.value
      }
      db.collection('devitts').add(newDevitt).then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      }).catch(function(error) {
        console.error('Error adding document: ', error)
      })
      newDeviContent = ''
    }

    let deleteDevitt = (devitts) => {
      db.collection('devitts').doc(devitts.id).delete().then(() => {
          console.log("Document successfully deleted!")
      }).catch((error) => {
          console.error("Error removing document: ", error)
      })
    }

    let likeDevitt = (devitts) => {
      db.collection('devitts').doc(devitts.id).set({
        userEmail: devitts.userEmail,
        userName: devitts.userName,
        content: devitts.content,
        date: devitts.date,
        liked: !devitts.liked,
      })
      .then(function() {
        console.log('Document successfully written! : liked')
      })
      .catch(function(error) {
        console.error('Error writing document: ', error)
      })
    }
    return {newDeviContent, devitts, relativeDate, toLogin,
            addNewDevitt, deleteDevitt, likeDevitt,
            userEmail, userName, loginState}
    },

  mounted() {
    db.collection('devitts').orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let devittsChange = change.doc.data()
          devittsChange.id = change.doc.id
          if (change.type === "added") {
              console.log("new dev: ", change.doc.data())
              this.devitts.unshift(devittsChange)
          }
          if (change.type === "modified") {
              console.log("Modified dev: ", change.doc.data())
              let index = this.devitts.findIndex(devitts => devitts.id === devittsChange.id)
              Object.assign(this.devitts[index], devittsChange)
          }
          if (change.type === "removed") {
              console.log("Removed dev: ", change.doc.data())
              let index = this.devitts.findIndex(devitts => devitts.id === devittsChange.id)
              this.devitts.splice(index, 1)
          }
        });
    });
    this.authAction()
    // console.log("user selector called")
    // if (this.getUserState != null){
    //   console.log("user state isnt null")
    //   db.collection("users").where("id", "==", this.getUserState.id )
    //     .get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, " => ", doc.data());
    //         });
    //     })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //     });
    // }
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
