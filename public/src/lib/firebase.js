// Shared Firebase setup for the ERHS FBLA site.
// These web config values are public by design; access is controlled by database.rules.json.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyBSDW1sgJfpk0PAsbp7JRLHT14-CSL8F_0",
  authDomain: "erhsfblaweb.firebaseapp.com",
  databaseURL: "https://erhsfblaweb-default-rtdb.firebaseio.com",
  projectId: "erhsfblaweb",
  storageBucket: "erhsfblaweb.appspot.com",
  messagingSenderId: "123112557466",
  appId: "1:123112557466:web:6dd4db634f9dee8c378823",
  measurementId: "G-8RT2TZHY8B"
};

export const db = getDatabase(initializeApp(firebaseConfig));
