import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';

import User from '../../components/User/User';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Users.css';


import * as actions from '../../store/actions';


class Users extends Component{
    state = {
        
        pageCount: 1

    }
    componentDidMount(){
        this.props.onFetchUsers(this.state.pageCount)       
    }

    addUserHandler= ()=>{
        this.props.history.push('/user-data');
    }
    editUserHandler= (id)=>{
        console.log(id)
        this.props.history.replace( '/user-update/'+id);
        this.props.onFetchUser(id);     
        
    }
    prevPageHandler= () =>{
       this.setState(prevState =>({
           pageCount: prevState.pageCount -1
       }))
    }
    deleteUSer = (id) =>{
        this.props.onDelete(id)
        this.props.deleteFromState()
    }
    nextPageHandler= () =>{
        this.setState(prevState => ({
            pageCount: prevState.pageCount + 1
        }));
       
    }
   
    render(){
        let usrs = <Spinner/>;
        if(!this.props.loading){
            usrs = this.props.users.map(user =>(
                <User
                   key={user.id}
                   avatar={user.avatar}
                   firstName={user.first_name}
                   lastName={user.last_name}
                   deleted={this.props.deleteStatus}
                   id={user.id}
                   editUserClicked={()=>this.editUserHandler(user.id)}
                   deleteUserClicked={()=>this.deleteUSer(user.id)} />
                                
            ) )
        }
        let feedback = null;
        if(this.props.deleteStatus === 204){
           feedback = <p style={{fontSize:'30',color:'red'}}>User Deleted</p>       
        }
       
        return(
            <div className={classes.Users}>
                 
                {feedback}
                <div className={classes.AddUser}>
                  <Button btnType="Success"
                    clicked={this.addUserHandler}>Add User</Button>
                </div>
                   {usrs}
                
                    


                <div>
                <Button btnType="Success"
                    clicked={()=> this.props.onFetchUsers(this.state.pageCount -1)}>Previous</Button>
                <Button btnType="Danger"
                    clicked={()=> this.props.onFetchUsers(this.state.pageCount + 1)}>Next</Button>                  
                </div>
               
               
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        users: state.user.users,
        loading: state.user.loading,
        completed:state.user.completed,
        deleteStatus: state.user.deleteStatusCode,
        userId: state.user.userId,
        createdAt: state.user.createdAt,
        name: state.user.name,
        job:state.user.job,
       


    };
};
const mapDispatchToProps = dispatch =>{
    return{
        onFetchUsers: (pageId) =>dispatch(actions.fetchUsers(pageId)),
        onDelete:(userId) => dispatch(actions.deleteUser(userId)),
        onFetchUser: (id) => dispatch(actions.getUser(id)),
        deleteFromState:() => dispatch(actions.deleteStart())
      
    
    };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps) (Users));




