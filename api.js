import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  setDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAuth } from "firebase/auth";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOezIUHDfvQknPZzDcn4BcThBzgI08cKs",
  authDomain: "vanlife-cc955.firebaseapp.com",
  projectId: "vanlife-cc955",
  storageBucket: "vanlife-cc955.appspot.com",
  messagingSenderId: "954875011811",
  appId: "1:954875011811:web:c69a4fd292f75dfad7dbd6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
const vansCollectionRef = collection(db, "vans");

let uid;

const getUserId = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        // ...
      } else {
        uid = null;
      }
      resolve();
    });
  });
};

// const unsub = onSnapshot(
//   doc(db, "user", "NAMuKux4EhbNbDetaaMv5xRheFU2"),
//   (doc) => {
//     console.log("current data: ", doc.data());
//   },
//   (error) => {
//     console.error("Error fetching document: ", error);
//   }
// );

// THIS IS THE ONE I'M WORKING ON//
// needs to take in the data dynamically - object with updated changes
export async function updateVan(id, updatedValues) {
  await getUserId();
  const userVanRef = doc(db, "user", uid, "vans", id);
  setDoc(userVanRef, updatedValues, { merge: true });
}
// THIS ONE ABOVE ^ //

export async function getAllVans() {
  try {
    const usersSnapshot = await getDocs(collection(db, "user"));

    let allVans = [];

    // Use Promise.all to wait for all vansSnapshots to resolve
    await Promise.all(
      usersSnapshot.docs.map(async (userDoc) => {
        const userId = userDoc.id;

        const vansSnapshot = await getDocs(
          collection(db, "user", userId, "vans")
        );

        const userVans = vansSnapshot.docs.map((vanDoc) => ({
          ...vanDoc.data(),
          id: vanDoc.id,
          userId: userId,
        }));

        allVans = allVans.concat(userVans);
      })
    );

    return allVans;
  } catch (error) {
    console.error("Error getting all vans:", error);
    throw error;
  }
}

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

// export async function getLoggedInVans() {
//   await getUserId();
//   const snapshot = await getDocs(collection(db, "user", uid, "vans"));
//   const vans = snapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   return vans;
// }

export async function getLoggedInVans(callback) {
  try {
    await getUserId();
    const vansQuery = query(collection(db, "user", uid, "vans"));

    const unsubscribe = onSnapshot(vansQuery, (snapshot) => {
      const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      callback(vans);
    });

    // Attach the unsubscribe function to the callback for cleanup
    callback.unsubscribe = unsubscribe;
  } catch (error) {
    console.error("Error getting logged-in vans:", error);
    throw error;
  }
}

export async function getHostIncome() {
  await getUserId();
  const snapshot = await getDocs(collection(db, "user", uid, "income"));
  const income = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return income;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function addVan(data) {
  try {
    const collectionPath = `user/${uid}/vans`;
    const ref = await addDoc(collection(db, collectionPath), {
      ...data,
      id: uid,
    });
    const refTwo = await addDoc(collection(db, "vans"), { ...data, id: uid });
  } catch (err) {
    console.log(err);
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
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
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
    );
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

export async function register(data) {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const ref = await setDoc(doc(db, "user", user.user.uid), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

export async function logOut() {
  await signOut(auth);
  localStorage.clear();
  console.log("logged out");
}

export async function uploadImageAndStoreUrl(file) {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (err) {
    console.log(err);
  }
}
