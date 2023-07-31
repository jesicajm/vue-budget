import { createApp } from 'vue';

import App from './App.vue';
import store from './store/index.js';
import router from './router.js';

import firebaseConfig from './configFirebase.js'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import BaseCard from './components/UI/BaseCard';
import BaseFormCategory from './components/UI/BaseFormCategory';
import UpdateCategory from './components/UpdateCategory.vue';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = createApp(App);

app.use(router);

app.use(store);
app.component('base-card', BaseCard);
app.component('base-form-category', BaseFormCategory);
app.component('update-category', UpdateCategory);


app.mount('#app');

export default db