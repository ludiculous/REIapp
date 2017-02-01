import React, { Component } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {authenticate} from '../actions'

class Header extends Component {

  componentWillMount() {
    console.log(this.props.Authenticated)
  }

  renderAuthButton(){
    if(this.props.Authenticated){
      return (<button onClick={()=>{this.props.authenticate(false)}}>
      Sign Out
      </button>)
    }
    else {
      return(<button onClick={()=>{this.props.authenticate(true)}}>
        Log In
      </button>)
    }
  }

handleAuthenticate(){

  this.props.authenticate()
}

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              <a href="#" className="brand-logo">Real Estate App</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link
                    to={'/market/analysis'}

                  >
                  Market Analysis
                  </Link>
                </li>
                <li>
                  <Link to={'/RECalc'}>
                  Real Estate Calculator
                  </Link>
                </li>
                <li>
                {this.renderAuthButton()}
                </li>
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
      Authenticated:state.Authenticate.loggedIn
    }
}

export default  connect(mapStateToProps,{authenticate}) (Header);
