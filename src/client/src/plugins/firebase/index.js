import { firebaseConfig } from '@/../../../config/firebaseClient.config'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { createStoreModule, UPDATE_USER_ACTION } from './store'
import authFactory from './auth'

export default function install(Vue, options) {
  const { store, client } = options
  const db = firebase.initializeApp(firebaseConfig).firestore()
  const firebaseAuth = firebase.auth()

  store.registerModule('firebaseAuth', createStoreModule())
  Vue.prototype.$db = db
  Vue.prototype.$dbAuth = authFactory({ firebaseAuth, store, client })

  firebaseAuth.onAuthStateChanged(user => {
    store.dispatch(UPDATE_USER_ACTION, user)
  })
}