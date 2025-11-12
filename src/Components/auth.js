import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { app } from "./firebaseConfig"; // your Firebase initialization file

const auth = getAuth(app);
const db = getFirestore(app);

export async function signUpUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "user", user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    console.log("User created in Auth and Firestore:", user.uid);
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
}
