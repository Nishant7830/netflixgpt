import React from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase";
import { useEffect } from 'react';
import { addUser,removeUser} from '../utils/userSlice';
import { LOGO } from '../utils/constants'; 



function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const handleSignOut =()=>{
  

 signOut(auth).then(() => {

  // Sign-out successful.
}).catch((error) => {
  navigate("/error")
  // An error happened.
});


  }
  useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
 const { uid,email,displayName,photoURL} = user;
 dispatch(addUser({
   uid:uid,
  email:email,
  displayName:displayName,
  photoURL:photoURL}));
  navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
   },[]);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img 
      className="w-44"
      src={LOGO} alt=""/>
      {user && <div className="flex">
        <img 
        alt="usericon"
        src={user?.photoURL}/>
        <button onClick={handleSignOut} className="font-bold text-white"
        >Sign out</button>
      </div>
      }
    </div>
  )
}

export default Header;
