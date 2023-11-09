
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, query, where, setDoc } from "firebase/firestore/lite"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
import { getAuth } from "firebase/auth";


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
export const auth = getAuth(app)

const vansCollectionRef = collection(db, "vans")
// const userVansCollectionRef = collection(db, "user", auth.currentUser.uid, "vans")



export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getLoggedInVans(userId) {
    const snapshot = await getDocs(collection(db, "user", userId.uid, "vans"))
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

// export async function getHostVans() {
//     const q = query(vansCollectionRef, where("hostId", "==", "123"))
//     const snapshot = await getDocs(q)
//     const vans = snapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return vans
// }


export async function getHostVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

// export async function loginUser(creds) {
//     const res = await fetch("/api/login",
//         { method: "post", body: JSON.stringify(creds) }
//     )
//     const data = await res.json()

//     if (!res.ok) {
//         throw {
//             message: data.message,
//             statusText: res.statusText,
//             status: res.status
//         }
//     }

//     return data
// }

export async function loginUser(creds) {
    try {
        const user = await signInWithEmailAndPassword(
            auth, 
            creds.email, 
            creds.password
        )
        console.log(user)
    } catch (error) {
        console.log(error.message)
    }
}


export async function register(data) {

    try {
        const user = await createUserWithEmailAndPassword(
            auth, 
            data.email, 
            data.password
        )
        const ref = await setDoc(doc(db, "user", user.user.uid), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          });
        console.log(user)
    } catch (error) {
        console.log(error.message)
    }
}

export async function logOut() {
    await signOut(auth)
}

