import React, { Component } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {signoutUser} from '../actions'

class Header extends Component {

  componentWillMount() {
    console.log(this.props.Authenticated)
  }
  componentWillUpdate(){
    console.log(this.props.Authenticated)
  }


  renderAuthButton(){
    if(this.props.Authenticated.authenticated){
      return (
      <li className="authBtn" onClick={()=>{this.props.signoutUser()}}> <Link to={'/SignOut'}>Sign Out</Link></li>
      )
    }
    else {
      return([
        <li><Link to={'/SignIn'} >Log In</Link>  </li>,
        <li>  <Link to={'/SignUp'} >Sign Up</Link></li>
    ])
    }
  }

handleAuthenticate(){
  console.log(this.props.Authenticate.authenticated)
}

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              <a href="#" className="brand-logo">Real Essential Estate </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link
                    to={'/market/analysis'}

                  >
                  Market Analysis
                  </Link>
                </li>
          
                {this.renderAuthButton()}

              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

const mapStateToProps=(state)=>{
    return{
      Authenticated:state.Authenticate
    }
}

export default  connect(mapStateToProps,{signoutUser}) (Header);
