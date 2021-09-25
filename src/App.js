
import './App.css';

import {
 
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import Home from './Screens/Home';
import Trades from './Screens/Trades'
import PlaceOrder from './Screens/PlaceOrder';
import TradeTable from './components/TradeTable';
import Login from './Screens/Login';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import SignUp from './Screens/SignUp';

function App() {
  const user= useSelector(state=>state.user)
    const dispatch = useDispatch()
    const  history=useHistory()
    console.log(history)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))
      
    if(user)
    {
      dispatch({type:'login',payload:user})
    
    }
    else {
      history.push('/login')
     console.log(history)
    }
  
    },[])

  return (
    
        <>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <SignUp/>
          </Route>
          <Route path="/trade/:id" exact>
            <Trades />
          </Route>
          <Route path="/trade" exact>
            <Trades />
          </Route>
          <Route path="/place-order/:id">
            <PlaceOrder />
          </Route>
          
        </>
    
  );
}

export default App;
