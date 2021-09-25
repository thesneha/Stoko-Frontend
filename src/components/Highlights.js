import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import { Link } from "react-router-dom";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  
function Highlights(props) {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
  return (
      <div style={{margin:'30px'}}>
    <TableContainer >
      <Table className={classes.table}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nifty Stocks</TableCell>
            <TableCell align="right">Market Overall Trend ↑ Upward</TableCell>
            <TableCell align="right">Total Volume 794121956</TableCell>
            <TableCell align="right">250SMA Volume 1562533561</TableCell>
            <TableCell align="right">Volume Change ↓ -49 %</TableCell>
            <TableCell align="right"><Link to="/trade" >
        All Trades
      </Link></TableCell>
          </TableRow>
        </TableHead>
        
      </Table>
    </TableContainer>
    </div>
  );
}

export default Highlights;