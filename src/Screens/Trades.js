import React from 'react';
import Header from '../components/Header';

import TradeTabs from './TradeTabs';


function Trades(props) {
    return (
        
            <div className="Trades">
      <Header text='Trades' />
     <TradeTabs />
      
    </div>
        
    );
}

export default Trades;