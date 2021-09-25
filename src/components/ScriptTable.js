import React from 'react';

import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable } from 'react-table';
import { Link } from "react-router-dom";
import './ScriptTable.css'
import {key} from '../api';
function ScriptTable({query}) {
  const [tableData,setTableData]=useState([])
  const [pageSize,setPageSize]=useState(10)
  const [pageIndex,setPageIndex]=useState(0)
  const url=key.prod
  const columns = React.useMemo(
    () => [
      {
        Header: 'Symbol',
        accessor:  d =>`${d.symbol} ${d.name}`,
        Cell:props=><><div>{props.value.split(" ")[0]}</div><div>[{props.value.split(" ").slice(1).join(" ")}]</div></> 
      },
      {
        Header: '52wk Low-High',
        accessor: d => `[${d.low52}  -  ${d.high52}]`,
      },
      {
        Header: 'Price',
        accessor: d => `${d.price} ${d.changeTxt}`,
        Cell:props=><><div>{props.value.split(" ")[0]}</div><div className={props.value.split(" ")[1][0]==='↓'?'downward':'upward'}>{props.value.split(" ")[1]}</div></>
      },
     
      {
        Header: 'Volume',
        accessor: 'volume',
       
      },
      {
        Header: 'Delivery%',
        accessor: 'deliveryPerc',
        Cell:props=><span>{props.value}%</span>
      },
      
      {
        Header:'Trade',
        accessor:'id',
        Cell:props=><>
        <div style={{marginBottom:'5px'}}><Link to={"/trade/"+props.value} >View Trades</Link></div><div><Link to={"/place-order/"+props.value} >Place Order</Link></div></>
      }
    ],
    []
  )
  
  
  const data=useMemo(()=>tableData,[tableData])
  const tableInstance =useTable({
    columns,
    data,
    
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = tableInstance

  const previousPage=()=>{
    //console.log(pageIndex)
    setPageIndex(prev=>prev-1)
  }
  const nextPage=()=>{
    //console.log(pageIndex)
    setPageIndex(prev=>prev+1)
  }
  useEffect( ()=>{
   
    const fetchData=async ()=>{
      let data;
      if(query){
        data=await fetch(`${url}/search`,{
          
          method:'POST',
          headers: {
             Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':localStorage.getItem('jwt'),
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            "pageInput":{
              "size":pageSize,
              "index":pageIndex
          },
          "search":{
              "scriptName":query
          }
          })
        })
        // console.log(data)
        data=await data.json()
        data=data.scriptInfos
        console.log( data)
      }
      else{
        
        data= await fetch(`${url}/`,{
          
        method:'POST',
        
        headers: {
          
          'Accept': 'application/json',
          'Authorization':`${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({"size":pageSize,
        "index":pageIndex})
      })
      console.log(data)
      data=await data.json()
      }
       
       
       setTableData(data)
      //console.log(data)
    }
    
    fetchData();

  },[pageIndex,pageSize,query])
  return (
    <>
    <table {...getTableProps()} className="scriptTable">
    <thead>
      {// Loop over the header rows
      headerGroups.map(headerGroup => (
        // Apply the header row props
        <tr {...headerGroup.getHeaderGroupProps()}>
          {// Loop over the headers in each row
          headerGroup.headers.map((column,index) => (
            // Apply the header cell props
            <th {...column.getHeaderProps()} >
              {// Render the header
              column.render('Header')}
            </th>
            
          ))}
          
        </tr>
      ))}
    </thead>
    {/* Apply the table body props */}
    <tbody {...getTableBodyProps()}>
      {// Loop over the table rows
      rows.map(row => {
        // Prepare the row for display
        prepareRow(row)
        return (
          // Apply the row props
          <tr {...row.getRowProps()}>
            {// Loop over the rows cells
            row.cells.map((cell,index) => {
              // Apply the cell props
              return (
                <td {...cell.getCellProps()} id={`id${index}`}>
                  {// Render the cell contents
                  cell.render('Cell')}
                </td>
              )
            })}
            
          </tr>
        )
      })}
    </tbody>
  </table>

  <div className="scriptTable_pagination">
       <select
         value={pageSize}
         onChange={e => {
           setPageSize(Number(e.target.value))
         }}
       >
         {[5,10,15,20,30].map(pageSize => (
           <option key={pageSize} value={pageSize}>
             Show {pageSize}
           </option>
         ))}
       </select>
       <button onClick={()=>setPageIndex(0)}>{"<<"}</button>
    <button onClick={previousPage} >prev</button>
    <button onClick={nextPage} >next</button>
    <button onClick={()=>setPageIndex(15)} >{">>"}</button>
  </div>
  
    </>
 
  );
}

export default ScriptTable;