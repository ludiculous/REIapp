import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signoutUser} from '../actions';


class SignOut extends Component {
  render(){
    return(
        <div className="signOutMsg">You Have Successfully Signed Out</div>
    )
  }
}

export default connect(null,{signoutUser})(SignOut);
