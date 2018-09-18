import React,{Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './UserForm.css';
import Spinner from '../../UI/Spinner/Spinner';
import *as actions  from '../../../store/actions';


class UserForm extends Component{
    constructor(props){
        super(props)

        
        this.state = {
            userForm :{
                firstName: {
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Enter your name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false
                },
                lastName:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder:'Enter your Job Title'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid: false,
                    touched:false
                }
    
            },
            formIsValid:false,
            title: ""
        };

        
       
     
       
    } 
    componentDidMount(){
       
        if(this.props.isLoaded){
            this.setValues()
        }

        var user_id = this.props.match.params.id;
        if (user_id > 0) {
            this.props.onFetchUser(user_id);   
        } 
        
        
    } 
  

   setValues = () =>{
    
        let obj = this.props.userData
      
        const updatedUserForm = {
          ...this.state.userForm
      };
      const updatedFirstName = {
          ...updatedUserForm.firstName,
      };
      const updatedLastName = {
          ...updatedUserForm.lastName
      };
     


      updatedFirstName.value =obj['data']['first_name']
    //   updatedLastName.value = "Wanjiku"
      updatedLastName.value = obj['data']['last_name']
  
      updatedUserForm.firstName= updatedFirstName;
      updatedUserForm.lastName= updatedLastName;
  
      this.setState({userForm:updatedUserForm});

   
   }

  
    checkValidity = (value, rules)=>{
        let isValid = true;
        //If no rule privided return true
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid =  value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.isEmail){
            const pattern =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
   
    }

    inputChangeHandler= (event, inputIdentifier) =>{
        const updatedUserForm = {
            ...this.state.userForm
        };
        const updatedFormElement = {
            ...updatedUserForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedUserForm[inputIdentifier] = updatedFormElement;

        let formIsValid =  true;
        for (let inputIdentifier in updatedUserForm){
            formIsValid =  updatedUserForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({userForm:updatedUserForm, formIsValid: formIsValid});

    }
    
   userInfoHandler = (event) =>{
       event.preventDefault();
       this.props.onUpdate( this.state.userForm.firstName.value, 
              this.state.userForm.lastName.value,
              this.props.match.params.id )         
    
   
   
   } 
  
  render(){
    //Create an  array of form elements with key value objects
    const formElementArray = [];
    for(let key in this.state.userForm){
        formElementArray.push({
              id:key,
              config: this.state.userForm[key]
        });
    }

    let form = <Spinner/>;  
    if(!this.props.loading && this.props.isLoaded){
       form =  (
            <form onSubmit={this.userInfoHandler}>
               {formElementArray.map(formElement =>(
                     
                      <Input
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value ={formElement.config.value}
                      invalid ={!formElement.config.valid}
                      shouldValidate = {formElement.config.validation}
                      touched={formElement.config.touched}
                      changed ={(event) => this.inputChangeHandler(event,formElement.id)} /> 
               ))}
               <Button btnType="Success" >Update User</Button>
               <p>User  was updated at {this.props.updatedAt}</p>
            </form>
        );
    }

   
      return(
          <div className={classes.UserForm}>
             <h4>Update User Details</h4>
           
             {form}
        
            
          </div>
      );
  }
}

const mapStateToProps = state=>{
   return{
       updatedAt: state.user.updateAt,
       users: state.user.users,
       loading: state.user.loading,
       updatId: state.user.updatId,
       userData: state.user.userData,
       isLoaded: state.user.isLoaded,
       getSucessCode: state.user.getSucessCode
   }
};

const mapDispatchToProps = dispatch =>{
    return{
        onUpdate:(name, job, userId) =>dispatch(actions.updateUser(name, job, userId)),
        
    }
}
export default connect(  mapStateToProps, mapDispatchToProps)(UserForm);