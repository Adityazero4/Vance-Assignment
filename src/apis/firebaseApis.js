import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const setData = async (body, user) => {
  try {
    const alertsRef = collection(db, "users", user, "alerts");
    await setDoc(doc(alertsRef), body);

    console.log("Alert successfully written!");
  } catch (e) {
    console.error("Error adding alert: ", e);
  }
};

export const getUserAlerts = async (user) => {
  try {
    const alertsRef = collection(db, "users", user, "alerts");
    const querySnapshot = await getDocs(alertsRef);
    const alerts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return alerts;
  } catch (error) {
    console.error("Error fetching user alerts: ", error);
  }
};