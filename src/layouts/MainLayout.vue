<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{$route.name}}</span>
          <q-icon 
            class="header-icon q-pa-md lt-md"
            name="fas fa-laptop-code"
            size="sm"
            color="primary" 
          />
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen"
      side="left"
      :width="283"
      bordered
      show-if-above>
      
      <q-icon 
        class="q-pa-md"
        name="fas fa-laptop-code"
        size="lg"
        color="primary" 
      />

      <q-list>
        <q-item 
        to="/"
        v-ripple
        clickable
        exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6
          text-weight-bold">Home</q-item-section>
        </q-item>

        <q-item 
          to="/about"
          v-ripple
          clickable
          exact>
          <q-item-section avatar>
            <q-icon name="account_circle" size="md" />
          </q-item-section>

          <q-item-section class="text-h6
            text-weight-bold">About
          </q-item-section>
        </q-item>

        <q-item 
          to="/contect"
          v-ripple
          clickable
          exact>
          <q-item-section avatar>
            <q-icon name="chat" size="md" />
          </q-item-section>

          <q-item-section class="text-h6
            text-weight-bold">Direct (progressing)
          </q-item-section>
        </q-item>

        <q-item 
          to="/signs"
          v-ripple
          clickable
          exact>
          <q-item-section avatar>
            <q-icon name="chat" size="md" />
          </q-item-section>
          
          <q-item-section class="text-h6
            text-weight-bold">Sign In / Out
          </q-item-section>
        </q-item>

        <q-item 
          v-ripple
          clickable
          exact
          @click="showModal = !showModal">
          <q-item-section avatar>
            <q-icon name="chat" size="md" />
          </q-item-section>
            <div class="white-bg" v-if="showModal==true">
              <!-- <h4>modal test2</h4>
              <p>modal test2</p> -->
            </div>
          <q-item-section class="text-h6
            text-weight-bold">Modal (progressing)
          </q-item-section>
        </q-item>

     </q-list>


    </q-drawer>
  
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input
        placeholder="search Devitter" 
        class="q-ma-md"
        outlined
        rounded
      >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-list padding>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Updating</q-item-label>
          <q-item-label class="text-weight-bold">Building server</q-item-label>
          <q-item-label caption>attaching SSL certification.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2021-09-25</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Updating</q-item-label>
          <q-item-label class="text-weight-bold">Building backend server</q-item-label>
          <q-item-label caption>building backend server in my AWS.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2021-09-21</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Updating</q-item-label>
          <q-item-label class="text-weight-bold">DB attach done!</q-item-label>
          <q-item-label caption>DB attachment done! log-in function on it's way.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2021-09-05</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Updating</q-item-label>
          <q-item-label class="text-weight-bold">Fixing done!</q-item-label>
          <q-item-label caption>Devitter's layout and main page completed, now I'll attach some DB for function and add log-in function!</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2021-09-05</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Updating</q-item-label>
          <q-item-label class="text-weight-bold">Fixing Layouts</q-item-label>
          <q-item-label caption>
            fixing layouts and some main pages.
            </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2021-09-03</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Opening</q-item-label>
          <q-item-label class="text-weight-bold">Devitter Created!</q-item-label>
          <q-item-label caption>
            Devitter Created today. what a historical moment!</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2021-09-03</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
        <!-- for login modal test -->
          <div id="app">
          <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
          </transition>
          <transition name="slide" appear>
            <div class="modal" v-if="showModal">
            <h6>Modal Page</h6>
            <p>This window will be sign in / out soon!</p>
            <button class="button" @click="showModal = false">
              Close
            </button>
            </div>
          </transition>
          </div>
</template>

<script>
import { ref } from 'vue'
import { firebaseSigns } from 'boot/firebaseSigns'

export default {
  setup () {

    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    var ismodal = ref(false)
    var showModal = ref(false)
    var Signs = firebaseSigns

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },

      ismodal, showModal, Signs
    }
  },
  
}


</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)

* 
  margin: 0
  padding: 0
  box-sizing: border-box


body 
  font-family: 'montserrat', sans-serif


#app 
  position: relative
 
  display: flex
  justify-content: center
  align-items: center
 
  width: 100vw
  min-height: 100vh
  overflow-x: hidden


.button 
  appearance: none
  outline: none
  border: none
  background: none
  cursor: pointer
 
  display: inline-block
  padding: 15px 25px
  background-image: linear-gradient(to right, #CC2E5D, #FF5858)
  border-radius: 8px
 
  color: #FFF
  font-size: 18px
  font-weight: 700
 
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4)
  transition: 0.4s ease-out

  hover 
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6)
 


.modal-overlay 
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 98
  background-color: rgba(0, 0, 0, 0.3)


.modal 
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 99
 
  width: 100%
  max-width: 400px
  background-color: #FFF
  border-radius: 16px
 
  padding: 25px
 
  h1 
  color: #222
  font-size: 32px
  font-weight: 900
  margin-bottom: 15px
 

  p 
  color: #666
  font-size: 18px
  font-weight: 400
  margin-bottom: 15px
 


.fade-enter-active,
.fade-leave-active 
  transition: opacity .5s


.fade-enter,
.fade-leave-to 
  opacity: 0


.slide-enter-active,
.slide-leave-active 
   transition: transform .5s


.slide-enter,
.slide-leave-to 
  transform: translateY(-50%) translateX(100vw)

</style>
