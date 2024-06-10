import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { query, where, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyC04PNL9oC9KrVO0dF5LeU5sSsuAzjinyg",
    authDomain: "peliculas-online-dcbd1.firebaseapp.com",
    projectId: "peliculas-online-dcbd1",
    storageBucket: "peliculas-online-dcbd1.appspot.com",
    messagingSenderId: "132973710405",
    appId: "1:132973710405:web:a6711fa65b157ece28e72c"
  };

  

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export const getData = (data) => {
    onSnapshot(collection(db, 'Peliculas'), data)
}


export const eliminar = (id) =>{

    deleteDoc(doc(db,'Peliculas',id))
}

export const obtener = (id) => getDoc(doc(db,'Peliculas',id))
export const update = (id,peliculas) =>{
    updateDoc(doc(db,'Peliculas',id),peliculas)
}


export const save = async (form) => {
  const a = query(collection(db, 'Peliculas'), where("codigo", "==", form.codigo));

  const querySnapshot = await getDocs(a);
  if (querySnapshot.empty) {
    await addDoc(collection(db, 'Peliculas'), form);
    return true;
  } else {
    return false;
  }
}