import React, { Component } from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Users from './containers/Users/Users';
import Favorites from './containers/Favorites/Favorites';
import UserForm from './components/User/UserForm/UserForm';
import UserUpdate from './components/User/UserForm/UserUpdate';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render() {

      let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={Favorites} />
          <Redirect to="/" />
        </Switch>
    );

    if (this.props.isAuthenticated){
      routes = (
        <Switch>
             <Route path="/users" component={Users}/>
             <Route path="/logout"  component={Logout}/>
             <Route path="/user-data" component={UserForm}/>
             <Route path="/user-update" component={UserUpdate}/>
             <Route path="/auth" component={Auth}/>
             <Route  path="/" exact component={Favorites}/>
             <Redirect  to="/"/>
        </Switch>
      );
    }
    return (
      <div>
         <Layout>
           {routes}
         </Layout>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default  withRouter( connect(mapStateTopProps, mapDispatchToProps)(App));
