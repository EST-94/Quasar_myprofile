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
            text-weight-bold">Direct Contect
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
          <q-item-label class="text-weight-bold">Fixing done!</q-item-label>
          <q-item-label caption>Devitter's main page completed, now I'll attach some DB for function and add log-in function!</q-item-label>
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
            Devitter Created today. what a historical moment! 
            (referenced : https://www.youtube.com/watch?v=la-0ulfn0_M&ab_channel=freeCodeCamp.org)</q-item-label>
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
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>