import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TradeTable from '../components/TradeTable';
import { useParams} from "react-router-dom";
import './TradeTabs.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    margin:'30px'
    
  },
}));

export default function TradeTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:'green'}}>
        <Tabs value={value} onChange={handleChange}  > 
          <Tab label="All Trades" {...a11yProps(0)} style={{color:'white',fontWeight:'500'}}/>
          <Tab label="Today's Trades" {...a11yProps(1)} />
          <Tab label="Closed Trades" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TradeTable id={id} tableType='getAll'/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TradeTable id={id} tableType='todayTrade'/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TradeTable id={id} tableType='closedTrade'/>
      </TabPanel>
    </div>
  );
}