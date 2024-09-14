import React from 'react'
import { useState,useRef } from 'react';
import Header from './Header';
import  { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
  const [isSignInForm,setIsSignForm] = useState(true);
  const [errorMessage,setErrorMessage] =useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password =useRef(null);
  const toggleSignInForm = ()=>{
      setIsSignForm(!isSignInForm);
  }
  const handleButtonClick =() =>{
    //Validate the form data
    console.log(email.current.value);
   
  console.log(password.current.value);
  const message = checkValidData(email.current.value,password.current.value);
  console.log(message);
setErrorMessage(message);
 

   if(message) return;
   if(!isSignInForm)
   {
   createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;


updateProfile(user, {
  displayName:name.current.value, 
  photoURL: "https://tse1.mm.bing.net/th?id=OIP.D_pgY0PtN8xkegp9PqCZ8AHaHa&pid=Api&P=0&h=180"
}).then(() => {
  const { uid,email,displayName,photoURL} = auth.currentUser;
 dispatch(addUser({
   uid:uid,
  email:email,
  displayName:displayName,
  photoURL:photoURL}));
    navigate("/brower");

}).catch((error) => {
    setErrorMessage(error.message);
});
    console.log(user);
    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
   
    // ..
  });
   }
   else
   {
    signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage);
      });
   }
   };
  return (
  
    <div>
      <Header/>
      <div className= "absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/04bef84d-51f6-401e-9b8e-4a521cbce3c5/null/IN-en-20240903-TRIFECTA-perspective_0d3aac9c-578f-4e3c-8aa8-bbf4a392269b_large.jpg"
      alt="Logo"/>
      </div>
      <form 
      onSubmit ={(e)=>e.preventDefault()}className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80"> 
       <h1 className="font-bold text-3xl text-white p-4 m-4">{isSignInForm ? "Sign In" :"Sign up"}</h1>
       {!isSignInForm && (<input type="text" placeholder="full name"
         className="p-2 my-2 w-full"/>

       )}
       

        <input 
        ref={email} type="text" placeholder="Email Address" 
        className="p-2 my-2 w-full"/>

        <input
        ref={password} type="text" placeholder="Password"
         className="p-2 my-2 w-full"/>
         <p className="text-red-500 font-bold text -lg"> {errorMessage}</p>
        <button className="p-4 my-6 w-full text-white bg-red-700 rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" :"Sign up"}
        </button>
        <p className="py-4 text-white cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" :"already registered? Sign in Now.."}</p>
      </form>
     </div>
     
  )
}

export default Login;
