import React, {Component} from 'react';
import {connect} from 'react-redux';
export default (ComposedComponent)=>{
  class Authentication extends Component {
      componentWillMount(){
        if(!this.props.Authenticated){
            this.props.router.push('/')
        }
      }

      componentWillUpdate(nextProps){
        if(!nextProps.Authenticated){
            this.props.router.push('/')
        }
      }

        render(){
          console.log(this.props.location.pathname);
          console.log(this.props.location.query);

          return(
            <ComposedComponent
              {...this.props}
            />
          )
        }

  }
const mapStateToProps = (state)=>{
  return {
  Authenticated:state.Authenticate.loggedIn
  }
}

  return  connect(mapStateToProps)(Authentication);
}
