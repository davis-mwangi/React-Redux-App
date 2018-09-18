import React from 'react';

import homeMenu  from '../../assets/images/logo.gif';
import classes from './Logo.css';

const logo = (props)=>(
   <div className={classes.Logo} style={{height:props.height}}>
        <img src={homeMenu} alt="MyMenu"/>
   </div>
);
export default logo;