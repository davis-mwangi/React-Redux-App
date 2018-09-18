import React from 'react';
import {NavLink} from 'react-router-dom';

import clasess from './NavigationItem.css';

const navigationItem =(props)=>(
     <li className={clasess.NavigationItem}>
        <NavLink
           to={props.link}
           exact={props.exact}
           activeClassName={clasess.active}>
             {props.children}
        </NavLink>

     </li>
);
export default navigationItem;
