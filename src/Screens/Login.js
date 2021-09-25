import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory,Link } from 'react-router-dom';
import {key} from '../api'
import './Login.css'
function Login(props) {
    const emailRef=useRef(null);
    const passwordRef = useRef(null);
    const [error,setError]=useState('')

    const user= useSelector(state=>state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const url=key.prod
    const signIn=async (e)=>{
        
        e.preventDefault();
        let user = await fetch(`${url}/user/login`,{
            method:'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({"emailId":emailRef.current.value,
            "password": passwordRef.current.value,
            
        })
          })
          user=await user.json()
          //console.log(user)
          if(user.tokenResponse){
            localStorage.setItem('jwt',user.tokenResponse?.accessToken)
          localStorage.setItem('user',JSON.stringify(user?.userResponse))
          dispatch({type:'login',payload:user})
          
          //console.log(user)
          
          history.push('/')
          }
          else if(user.error){
            emailRef.current.value=''
            passwordRef.current.value='';
              setError(user.error)
          }
          
    }

    
    return (
        <div className="signUpScreen">
            <form>
                 <h1>Sign In</h1>
                 <input ref={emailRef} placeholder="Email" type="email" />
                 <input ref={passwordRef} placeholder="Password" type="password"/>
                 {error?
                 <p>Invalid email or password</p>:<></>
                 }
                 <button type="submit" onClick={(signIn)}> Sign In </button>
            </form>
            <h4>
                <span className="signUpScreen_gray">New to Stoko? </span>
                <span className="signUpScreen_link"><Link to='/register'>Sign up now.</Link></span>
            </h4>

            
            <p> {user?.userResponse?.userName}</p> 
        </div>
    );
}

export default Login;