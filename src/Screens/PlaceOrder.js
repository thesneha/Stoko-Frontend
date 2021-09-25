import React from 'react';
import { FormControl,Button ,InputLabel,FormHelperText,Input,Radio,RadioGroup,FormControlLabel,FormLabel,Checkbox} from '@material-ui/core';
import './PlaceOrder.css'
import { useState } from 'react';
import { useHistory, useParams} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {key} from '../api';
function PlaceOrder() {
  const [tradeType,setTradeType]=useState("")
  const [tradePeriod,setTradePeriod]= useState("")
  const [buyPrice,setBuyPrice]=useState(0)
  const [isMarketOrder,setIsMarketOrder]=useState(true)
  const [quantity,setQuantity]=useState(0)
  const [targetPrice,setTargetPrice]=useState(0)
  const [stopLossPrice,setStopLossPrice]=useState(0)
  const [placeOrder,setPlaceOrder]=useState({})
  const history=useHistory()
  let { id } = useParams();
  const user= useSelector(state=>state.user)
  let userId=JSON.parse(localStorage.getItem('user')).id
  const url=key.prod
  function handlePlaceOrder(){
    
    let order={
      userId,
      scriptId:id,
      type:tradeType,
      period:tradePeriod,
      buyPrice,
      isMarket:isMarketOrder,
      quantity,
      targetPrice,
      stoploss:stopLossPrice}
    setPlaceOrder(order)
    //console.log(order)
    const postData=async ()=>{
      let data= await fetch(`${url}/trade/create`,{
        method:'POST',
        headers: {
           Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization':`${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(order)
      })
       data=await data.json()
       
      //console.log(data)
    }
    postData()
    history.push(`/`)
  }
    return (
  <div className="placeOrder">
  <div>

  <FormLabel component="legend" style={{fontWeight:'600',margin:'5px'}}>Trade Type:</FormLabel>
      <RadioGroup row aria-label="position" name="position"  style={{margin:'5px'}} onChange={(e)=>setTradeType(e.target.value)}>
        <FormControlLabel
          value="BUY"
          control={<Radio color="primary" />}
          label="Buy Order"
          labelPlacement="end"
        />
        
        <FormControlLabel
          value="SELL"
          control={<Radio color="primary" />}
          label="Sell Order"
          labelPlacement="end"
        />        
      </RadioGroup>

      <FormLabel component="legend" style={{fontWeight:'600',margin:'5px'}}>Trade Period:</FormLabel>
      </div>
      <div>
      <RadioGroup row aria-label="position" name="position" style={{margin:'5px'}} onChange={(e)=>setTradePeriod(e.target.value)}>
        <FormControlLabel
          value="INTRADAY"
          control={<Radio color="primary" />}
          label="Intra-Day"
          labelPlacement="End"
        />
        
        <FormControlLabel
          value="SHORTTERM"
          control={<Radio color="primary" />}
          label="Short-term"
          labelPlacement="end"
        />
        <FormControlLabel
          value="LONGTERM"
          control={<Radio color="primary" />}
          label="Long-term"
          labelPlacement="end"
        />        
      </RadioGroup>
      </div>
      <div>
      <FormLabel component="legend" style={{fontWeight:'600',margin:'5px'}}>Buy Price:</FormLabel>
      <Input  inputProps={{ 'aria-label': 'description' }} type="number" style={{margin:'5px'}} onChange={(e)=>setBuyPrice(e.target.value)}/>
      </div>
      <div>
      <FormLabel component="legend" style={{fontWeight:'600',margin:'5px'}}>Is Market Order:</FormLabel>
      <Checkbox 
        style={{margin:'5px',width:0}}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onChange={(e)=>setIsMarketOrder(e.target.checked)}
      />
      </div>
      <div>
      <FormLabel component="legend" style={{fontWeight:'600',margin:'5px'}}>Quantity:</FormLabel>
      <Input inputProps={{ 'aria-label': 'description' }} type="number" style={{margin:'5px'}} onChange={(e)=>setQuantity(e.target.value)}/>
      </div>
      <div>
      <FormLabel component="legend" style={{fontWeight:'600',margin:'5px'}}>Target Price:</FormLabel>
      <Input inputProps={{ 'aria-label': 'description' }} type="number" style={{margin:'5px'}} onChange={(e)=>setTargetPrice(e.target.value)}/>
      </div>
    
      <FormLabel component="legend" style={{fontWeight:'600',margin:'5px'}}>Stop Loss Price:</FormLabel>
      <Input  inputProps={{ 'aria-label': 'description' }} type="number" style={{margin:'5px'}} onChange={(e)=>setStopLossPrice(e.target.value)}/>
      
      <Button variant="contained" style={{backgroundColor:'green',color:'whitesmoke'}} onClick={handlePlaceOrder}>
  Place Order
</Button>

        </div>
    );
}

export default PlaceOrder;