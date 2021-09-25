import React from 'react';
import { useEffect,useState,useMemo } from 'react';
import { useTable } from 'react-table';
import { useSelector, useDispatch } from 'react-redux'
import {key} from '../api';
function TradeTable({id,tableType}) {
  //console.log(id,tableType)
  const url=key.prod
  const user= useSelector(state=>state.user)
  
  
  let userId=JSON.parse(localStorage.getItem('user')).id
  //console.log(userId)
  const [tableData,setTableData]=useState([])
  const columns = React.useMemo(
    () => [
      {
        Header: 'Symbol',
        accessor:  d =>`${d.symbol} ${d.name}`,
        Cell:props=><><div>{props.value.split(" ")[0]}</div><div>[{props.value.split(" ").slice(1).join(" ")}]</div></> 
      },
      {
        Header:'Type',
        accessor:'type',

      },
      {
        Header:'Purchased Date',
        accessor:'startDate'
      },
      {
        Header:'End Date',
        accessor:'endDate'
      },
      {
        Header:'State',
        accessor:'state'
      },
      {
        Header:'Period',
        accessor:'period'
      },
      {
        Header:'Buy Price',
        accessor:'buyPrice',

      },
      {
        Header:'Qty',
        accessor:'quantity'
      },
      {
        Header:'Stop Loss',
        accessor:'stoploss'
      },
      {
        Header:'Exit Price',
        accessor:'exitPrice'
      },
      
    ],[]
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
    useEffect( ()=>{
      const fetchData=async ()=>{
        let data;
        if(id){
          //console.log(userId)
          data= await fetch(`${url}/trade/${tableType}/${id}/${userId}`,{
            headers:{
               Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization':`${localStorage.getItem('jwt')}`
          }
          })
        }
        else{
           data= await fetch(`${url}/trade/${tableType}/${userId}`,{
            headers:{
               Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization':`${localStorage.getItem('jwt')}`
          }
           })
        }
        
         data=await data.json()
         setTableData(data)
        //console.log(data)
      }
      
      fetchData();
  
    },[id,userId,tableType])
  return (
      <div style={{margin:'0px'}}>
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
    </div>
  );
}

export default TradeTable;