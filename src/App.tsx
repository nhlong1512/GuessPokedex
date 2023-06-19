import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PlayGame from "./pages/PlayGame";
import NavBarWrapper from "./components/NavBarWrapper";
import { auth, db } from "./firebaseConfig";
import { setUser, signOut } from "./features/userSlice";
import Profile from "./pages/Profile";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);

        if (user?.uid === undefined) return;
        const userRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          dispatch(
            setUser({
              id: docSnap.data().id,
              fullName: docSnap.data().fullName,
              email: docSnap.data().email,
              phoneNumber: docSnap.data().phoneNumber,
              photoURL: docSnap.data().photoURL,
              score: docSnap.data().score,
            })
          );
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        //Logged in
        
        // navigate("/");
        return;
      } else {
        //Logged out
        dispatch(signOut());
        navigate("/sign-in");
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<NavBarWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<PlayGame />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
