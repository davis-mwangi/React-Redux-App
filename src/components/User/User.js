import React,{Component} from 'react';
import classes from './User.css';
import Button from '../UI/Button/Button';


 class User extends Component{
 


     render(){
         let user = (
            <div>
                    <img src={this.props.avatar} alt="User" />
                    <div className={classes.Name}>
                        <p>{this.props.firstName}</p>
                        <p>{this.props.lastName}</p>
                    </div>
                    <div>
                        <Button btnType="Success" clicked={this.props.editUserClicked}>Edit</Button>
                        <Button btnType="Danger" clicked={this.props.deleteUserClicked}>Delete</Button>
                    </div>
            </div>
         );
         return(
            <div className={classes.User}>
              {user}
           </div>
         );
     }
 } 

export default User;