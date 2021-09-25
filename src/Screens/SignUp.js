import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory,Link } from 'react-router-dom';
import './Login.css'
import {key} from '../api';

function SignUp(props) {
    const userNameRef=useRef(null);
    const emailRef=useRef(null);
    const passwordRef = useRef(null);
    const [error,setError]=useState('')

    const user= useSelector(state=>state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const url=key.prod
    const register=async (e)=>{
        // console.log(userNameRef.current.value)
        // console.log(emailRef.current.value)
        // console.log(passwordRef.current.value)
        
        e.preventDefault();
        let user = await fetch(`${url}/user/registerUser`,{
            method:'POST',
            headers: {
               Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                "userName":userNameRef.current.value,
                "emailId":emailRef.current.value,
                "password": passwordRef.current.value,
            
        })
          })
          user=await user.json()
          //console.log(user)
          if(user.id){
            history.push('/login')
          }
          else if(user.error){
            userNameRef.current.value='';
            emailRef.current.value='';
            passwordRef.current.value=''
             setError(user.error) 

          }
          //console.log(user)
         
          
    }

    
    return (
        <div className="signUpScreen">
            <form>
                 <h1>Sign In</h1>
                 <input ref={userNameRef} placeholder="Name" type="text" />
                 <input ref={emailRef} placeholder="Email" type="email" />
                 <input ref={passwordRef} placeholder="Password" type="password"/>
                 {error?
                 <p>You are already Member !</p>:<></>
                 }
                 <button type="submit" onClick={(register)}> Register </button>
            </form>
            <h4>
                <span className="signUpScreen_gray">Already Member? </span>
                <span className="signUpScreen_link"><Link to="/login">Sign in here.</Link></span>
            </h4>

            
            <p> {user?.userResponse?.userName}</p> 
        </div>
    );
}

export default SignUp;