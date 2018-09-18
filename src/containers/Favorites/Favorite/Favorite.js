import React from 'react';
import classes from './Favorite.css';

const favorite = (props) =>(

    <div className={classes.Favorite}>
        <p><span>Name: </span>{props.name}</p>
        <p><span>Year: </span>{props.year}</p>
        <p><span>Color: </span>{props.color}</p>
        <p><span>Pantone Value: </span>{props.pantonValue}</p>

    </div>
);

export default favorite;
  