// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <-- NOVO IMPORT DO STORAGE
import { getAuth, signInAnonymously } from "firebase/auth";

console.log("Variaveis do Vite:", import.meta.env);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app); // <-- EXPORTANDO O STORAGE

// 👇 Inicializa a Autenticação
export const auth = getAuth(app); 

// 👇 Roda o login fantasma logo que o Firebase inicializa
signInAnonymously(auth)
  .then(() => {
    console.log("🔒 Autenticação Anônima ativada com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro na Autenticação Anônima:", error);
  });