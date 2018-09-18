import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom'

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './UserForm.css';
import Users  from  '../../../containers/Users/Users';
import Spinner from '../../UI/Spinner/Spinner';
import *as actions  from '../../../store/actions';


class UserForm extends Component{
    state = {
        userForm :{
            firstName: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Enter your first name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            lastName: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            gender:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'female', displayValue:'Female'},
                        {value:'male',displayValue:'Male'}
                    ]
                },
                value:'female',
                validation:{},
                valid:true
            },
            job:{
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
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            city:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your City'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                },
                valid: false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            }
          
        },
        formIsValid:false
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
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
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
       const formData = {
            first_name: this.state.userForm.firstName.value,
            last_name:this.state.userForm.lastName.value,
            gender:this.state.userForm.gender.value,
            job:this.state.userForm.job.value,
            email:this.state.userForm.email.value,
            city:this.state.userForm.city.value,
            country:this.state.userForm.country.value,

       }
       this.props.onSubmit(formData)
       this.setState({
           userForm: ""
       })
   } 
   userInfoUpdate= (event) =>{
       event.preventDefault();
       this.props.onUpdate(this.state.userForm.job.value, this.props.userId)
   }

   newUserClickHandler= (event)=>{
     this.props.history.push('/users');
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
      let button  = <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.userInfoHandler}>Create User</Button>
      let form  =(
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
            
             
             
          </form>
      );
      if(this.props.loading){
          form = <Spinner/>
      }
      let created =  <h4>Enter User Details</h4>;
      if(this.props.success=== 201){
        created = <p style={{color:'green'}}>User Created Successfully</p>
        button = <Button clicked={this.newUserClickHandler} btnType="Success"
            disabled={!this.state.formIsValid}>View All Users</Button>
         
           
      }
      return(
          <div className={classes.UserForm}>
        
            
             { created} 
             {form}
             {button}
             <Route path={this.props.match.path + '/users'}
                   component={Users} />
          </div>
      );
  }
}
const mapStateToProps = state=>{
   return{
       userInfo: state.user.userData,
       loading: state.user.loading,
       userId: state.user.userId,
       createdAt: state.user.createdAt,
       name: state.user.name,
       job:state.user.job,
       users: state.user.users,
       success: state.user.success
   }
};

const mapDispatchToProps = dispatch =>{
    return{
        onSubmit:(formData) =>dispatch(actions.createUser(formData)),
        onDelete:(userId) => dispatch(actions.deleteUser(userId)),
        onUpdate:(name, job, userId) =>dispatch(actions.updateUser(name, job, userId))
    }
}
export default connect(  mapStateToProps, mapDispatchToProps)(UserForm);