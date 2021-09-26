# Devitter

Twitter Clone created with Quasar Framework, VueJS & Firebase
(https://devitter.netlify.app)

## Setup Firebase

- Create a new Firebase project named Devitter
- Create a Web App named Devitter
- Copy the config from the code sample that appears and add it to src/boot/firebase.js
- Create a Cloud Firestore database - make sure you choose "Start in test mode"

## For use API

- You need to setup your own server. In my case, I used AWS / nodejs.
- You can check the settings in src/--aws--

## Used dependencies (in building)

// for basic dependencies
- npm install

// for use firebase
- firebase

// for use API services (naver)
- axios, crypto-js

## Install the dependencies (when use)
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).


## Referenced from
https://www.youtube.com/watch?v=la-0ulfn0_M&list=PL99KBMJE17JwsU5Ugi-uqkxSD6Jf0Cj4G&index=13&ab_channel=freeCodeCamp.org

(Source Code : https://github.com/dannyconnell/qwitter)



## Patch note

### ver 1.0
- basic design, CRUD with firebase

### ver 1.3
- signin / signout avaliable.

### ver 1.31
- connected with my AWS server (SMS API, still avaliable in local)
