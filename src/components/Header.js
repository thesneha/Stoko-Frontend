import React from 'react';
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
function Header({text}) {
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <div className="header">
            <div>Img</div>
            <h1>{text}</h1>
            <button onClick={()=>{localStorage.clear()
            dispatch({type:'logout'})
            history.push('/login')}}>Logout</button>
        </div>
    );
}

export default Header;