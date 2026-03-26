import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBdRx1eKVFZOl_en6lokA50CnrZ3yWSH_g",
  authDomain: "learnia-92po22.firebaseapp.com",
  projectId: "learnia-92po22",
  storageBucket: "learnia-92po22.firebasestorage.app",
  messagingSenderId: "515959966019",
  appId: "1:515959966019:web:0ce85a4e31f9bf117dc7f6"
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, "us-central1");

export const callAskGemini = httpsCallable<{ prompt: string }, { answer: string }>(functions, "askGemini");