import React,{Component} from 'react';
import classes from './Favorites.css'
import {connect} from 'react-redux';

import Favorite from './Favorite/Favorite';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Favorites extends Component{

   componentDidMount(){
       this.props.onFetchFavorites()
   }

    render(){
        let favorites = <Spinner/>
        if(!this.props.loading){
            favorites = this.props.favorites.map(favorite =>(
                <Favorite
                    key={favorite.id}
                     name={favorite.name}
                     year ={favorite.year}
                     color={favorite.color}
                     pantonValue={favorite.pantone_value}
                   />
            ));
        }
        return(
            <div className={classes.Favorites}>
                   {favorites}
            </div>
        );
       
    }
}

const mapStateToProps = state=>{
    return{
        favorites: state.fav.favorites,
        loading: state.fav.loading
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        onFetchFavorites:() => dispatch(actions.fetchfavorites())
    }
}
export default  connect(mapStateToProps,mapDispatchToProps) (Favorites);