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
  deleteDoc,
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

export async function updateVan(id, updatedValues) {
  await getUserId();
  const userVanRef = doc(db, "user", uid, "vans", id);
  setDoc(userVanRef, updatedValues, { merge: true });
}

// THIS IS THE ONE I'M WORKING ON//
// needs to take in the data dynamically - object with updated changes

export async function getAllVans(callback) {
  const usersCollectionRef = collection(db, "user");

  const unsubscribe = onSnapshot(usersCollectionRef, async (usersSnapshot) => {
    try {
      let allVans = [];

      // Use Promise.all to wait for all vansSnapshots to resolve
      await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
          const userId = userDoc.id;

          const vansCollectionRef = collection(db, "user", userId, "vans");

          // Use a nested onSnapshot to listen for updates on the vans subcollection
          const vansUnsubscribe = onSnapshot(
            vansCollectionRef,
            (vansSnapshot) => {
              const userVans = vansSnapshot.docs.map((vanDoc) => ({
                ...vanDoc.data(),
                id: vanDoc.id,
                userId: userId,
              }));

              allVans = userVans;
              callback(allVans);
            }
          );

          // Store the vansUnsubscribe function in case you need to stop listening
          // for updates on this specific user's vans
          // (you might want to manage this in your component's state)
          // userVansUnsubscribes.push(vansUnsubscribe);
        })
      );

      // Optionally, you can callback here as well if you want to get the initial data
      // callback(allVans);
    } catch (error) {
      console.error("Error fetching vans:", error);
    }
  });

  // Return the unsubscribe function to stop listening when needed
  return unsubscribe;
}

// THIS ONE ABOVE ^ //

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

export async function getHostReviews() {
  await getUserId();
  const snapshot = await getDocs(collection(db, "user", uid, "Reviews"));
  const reviews = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return reviews;
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
    await getUserId();
    const collectionPath = `user/${uid}/vans`;
    const ref = await addDoc(collection(db, collectionPath), {
      ...data,
      id: uid,
    });
    // console.log(ref);
    // const refTwo = await addDoc(collection(db, "vans"), { ...data, id: uid });
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

export async function deleteVan(id) {
  await getUserId();
  const userVanRef = doc(db, "user", uid, "vans", id);
  await deleteDoc(userVanRef);
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
