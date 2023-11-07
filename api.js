
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from "firebase/firestore/lite"


const firebaseConfig = {
  apiKey: "AIzaSyDOezIUHDfvQknPZzDcn4BcThBzgI08cKs",
  authDomain: "vanlife-cc955.firebaseapp.com",
  projectId: "vanlife-cc955",
  storageBucket: "vanlife-cc955.appspot.com",
  messagingSenderId: "954875011811",
  appId: "1:954875011811:web:c69a4fd292f75dfad7dbd6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }      
}

export async function getHostVan() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}