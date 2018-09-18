import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Auth extends Component{
    state ={
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter your email address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false

            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Pasword'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:8
                },
                valid:false,
                touched:false
            }

        },
        isSignUp :true


    }
   componentDidMount(){
    if(this.props.authRedirectPath !== '/'){
        this.props.onSetAuthRedirectPath();
    }

   }

    //return true or false for a given value 
    //when checked against the rules
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


    inputChangeHandler = (event,controlName)=>{
       // console.log(this.state.controls[controlName].valid);
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            }
            
        };
       
        this.setState({controls:updatedControls});

    }
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
        
    }
    switchAuthHandler = () => {
        this.setState((prevState)=>{
            return {isSignUp: !prevState.isSignUp};
        });
    }

    render(){
        //Create an array of form elements with key value objects
        const formelementsArray = [];
        for(let key in this.state.controls){
            formelementsArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }
        //Loop through the formElements array and pass props to input
        let form = formelementsArray.map(formelement =>(
            <Input
               key ={formelement.id}
               elementType={formelement.config.elementType}
               elementConfig = {formelement.config.elementConfig}
               value ={formelement.config.value}
               invalid ={!formelement.config.valid}
               shouldValidate ={formelement.config.validation}
               touched = {formelement.config.touched}
               label={formelement.id}
               changed ={(event)=>this.inputChangeHandler(event,formelement.id)}
            />
        ));

        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p style={{color:'red'}}>{this.props.error}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated && this.props.statusCode === 200){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        if(this.props.isAuthenticated && this.props.statusCode === 201){
            authRedirect = <p style={{color:'green'}} >User Registered Successfully</p>
        }
         
        return(
            <div className={classes.Auth}>
                <h3>{this.state.isSignUp? 'SIGN UP':'SIGN IN'}</h3>
                {authRedirect}
                {errorMessage}
              
              <form onSubmit={this.submitHandler}>
                   {form}
               <Button btnType="Success">SUBMIT</Button>    
              </form>
              <Button clicked={this.switchAuthHandler} btnType="Danger">SWITCH TO 
                   {this.state.isSignUp? 'SIGNIN': 'SIGNUP'}
              </Button>

            </div>

        );
    }
}
const mapStateToProps =  state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        statusCode : state.auth.statusCode
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password,isSignup)),
        onSetAuthRedirectPath:() =>dispatch(actions.setAuthRedirectPath('/'))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);