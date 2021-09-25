import React from 'react';
import Header from '../components/Header';
import Highlights from '../components/Highlights';
import Search from '../components/Search';
import Login from './Login';

import { useSelector, useDispatch } from 'react-redux'

function Home(props) {
  const user= useSelector(state=>state.user)
    const dispatch = useDispatch()
    return (
        
            <div className="Home">
             
      <Header text='High Volume NSE Scripts' />
      <Highlights />
      <Search/>
      
    </div>
        
    );
}

export default Home;